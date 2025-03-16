import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { db } from './db';
import { sql } from 'drizzle-orm';
import { Session } from 'express-session';

// Extender Session para incluir nuestras propiedades
declare module 'express-session' {
  interface Session {
    isAuthenticated?: boolean;
    username?: string;
  }
}

// Definir interfaz para usuario administrador
interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

// Variable local para usuario administrador (en producción debería estar en base de datos)
let adminUser: AdminUser | null = null;

/**
 * Inicializar el usuario administrador
 */
export async function initializeAdmin() {
  try {
    // Verificar si existe la tabla de administradores
    const tableExists = await db.execute(sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
      );
    `);
    
    // En postgres.js, el resultado directo contiene los datos
    const exists = tableExists[0]?.exists === true;
    
    if (!exists) {
      // Crear tabla de administradores si no existe
      await db.execute(sql`
        CREATE TABLE admin_users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(255) NOT NULL UNIQUE,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }
    
    // Verificar si existe un usuario administrador
    const adminUsers = await db.execute(sql`
      SELECT * FROM admin_users LIMIT 1;
    `);
    
    if (!adminUsers || adminUsers.length === 0) {
      // Crear usuario por defecto si no existe ninguno
      const defaultUsername = 'admin';
      const defaultPassword = 'admin123'; // En producción debe ser más seguro
      const passwordHash = await bcrypt.hash(defaultPassword, 10);
      
      await db.execute(sql`
        INSERT INTO admin_users (username, password_hash)
        VALUES (${defaultUsername}, ${passwordHash});
      `);
      
      console.log('Usuario administrador creado con credenciales por defecto');
      
      // Obtener el usuario creado
      const newAdmin = await db.execute(sql`
        SELECT * FROM admin_users WHERE username = ${defaultUsername};
      `);
      
      // Conversión segura para el usuario administrador
      const newAdminData = newAdmin[0] as Record<string, unknown>;
      adminUser = {
        id: Number(newAdminData.id),
        username: String(newAdminData.username),
        password_hash: String(newAdminData.password_hash)
      };
    } else {
      // Guardar usuario existente en memoria con conversión segura
      const existingAdminData = adminUsers[0] as Record<string, unknown>;
      adminUser = {
        id: Number(existingAdminData.id),
        username: String(existingAdminData.username),
        password_hash: String(existingAdminData.password_hash)
      };
    }
    
    console.log('Autenticación de administrador inicializada');
  } catch (error) {
    console.error('Error inicializando autenticación de administrador:', error);
  }
}

/**
 * Middleware para verificar si el usuario está autenticado
 */
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  
  return res.status(401).json({ message: 'No autorizado' });
}

/**
 * Verificar credenciales de usuario
 */
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  try {
    // Buscar el usuario en la base de datos
    const users = await db.execute(sql`
      SELECT * FROM admin_users WHERE username = ${username};
    `);
    
    if (!users || users.length === 0) {
      return false;
    }
    
    // Conversión segura para el usuario
    const userData = users[0] as Record<string, unknown>;
    const user: AdminUser = {
      id: Number(userData.id),
      username: String(userData.username),
      password_hash: String(userData.password_hash)
    };
    
    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    return isValid;
  } catch (error) {
    console.error('Error verificando credenciales:', error);
    return false;
  }
}