import * as bcrypt from 'bcryptjs';
import { db, initializeDatabase } from './db';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

// Interfaz para el usuario administrador
interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
}

// Función para inicializar el usuario administrador
export async function initializeAdmin() {
  try {
    // Obtener credenciales del administrador desde variables de entorno
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminUsername || !adminPassword) {
      console.error('Error: No se han definido las credenciales de administrador en el archivo .env');
      return;
    }
    
    // Verificar si ya existe un administrador
    const result = await db.execute(
      `SELECT * FROM admin_users WHERE username = $1`,
      [adminUsername]
    );
    
    if (result.rows.length === 0) {
      // No existe el administrador, crearlo
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(adminPassword, salt);
      
      await db.execute(
        `INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)`,
        [adminUsername, passwordHash]
      );
      
      console.log(`Administrador '${adminUsername}' creado exitosamente`);
    } else {
      console.log(`El administrador '${adminUsername}' ya existe`);
    }
  } catch (error) {
    console.error('Error inicializando administrador:', error);
  }
}

// Middleware para verificar si el usuario está autenticado
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.isAuthenticated) {
    return next();
  }
  
  // No autenticado, redireccionar al login
  return res.redirect('/admin/login');
}

// Función para verificar credenciales
export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  try {
    const result = await db.execute(
      `SELECT * FROM admin_users WHERE username = $1`,
      [username]
    );
    
    if (result.rows.length === 0) {
      return false;
    }
    
    const admin = result.rows[0] as AdminUser;
    return await bcrypt.compare(password, admin.password_hash);
  } catch (error) {
    console.error('Error verificando credenciales:', error);
    return false;
  }
}