import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import { db } from './db';
import { sql } from 'drizzle-orm';

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
    
    const exists = tableExists.rows[0]?.exists === true;
    
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
    
    if (adminUsers.rows.length === 0) {
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
      
      adminUser = newAdmin.rows[0] as AdminUser;
    } else {
      // Guardar usuario existente en memoria
      adminUser = adminUsers.rows[0] as AdminUser;
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
    
    if (users.rows.length === 0) {
      return false;
    }
    
    const user = users.rows[0] as AdminUser;
    
    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    return isValid;
  } catch (error) {
    console.error('Error verificando credenciales:', error);
    return false;
  }
}