import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Obtener URL de base de datos de variable de entorno o usar valor por defecto
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

// Crear cliente de PostgreSQL
const client = postgres(DATABASE_URL);

// Crear instancia de Drizzle
export const db = drizzle(client);

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    // Intentar una consulta simple para verificar la conexión
    const result = await client`SELECT 1 as test`;
    console.log('Conexión a la base de datos establecida correctamente');
    return true;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    return false;
  }
}

// Función para cerrar la conexión a la base de datos
export async function closeDatabase() {
  try {
    await client.end();
    console.log('Conexión a la base de datos cerrada correctamente');
    return true;
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
    return false;
  }
}