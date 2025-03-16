import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";
import { clientRequests, propertyListings, agentClientListings } from "../shared/schema";

// Cargar variables de entorno
dotenv.config();

// Crear pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Crear cliente drizzle
export const db = drizzle(pool);

// Función para inicializar la base de datos (crear tablas si no existen)
export async function initializeDatabase() {
  try {
    console.log("Inicializando base de datos...");
    
    // Crear tabla de client_requests si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS client_requests (
        id SERIAL PRIMARY KEY,
        property_type TEXT NOT NULL,
        alcaldia TEXT NOT NULL,
        colonia TEXT NOT NULL,
        street TEXT,
        bedrooms TEXT,
        bathrooms TEXT,
        min_size INTEGER,
        max_budget INTEGER,
        has_credit BOOLEAN NOT NULL,
        credit_type TEXT,
        credit_amount INTEGER,
        needs_financing BOOLEAN,
        contact_name TEXT NOT NULL,
        contact_phone TEXT NOT NULL,
        contact_email TEXT NOT NULL,
        comments TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Crear tabla de property_listings si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS property_listings (
        id SERIAL PRIMARY KEY,
        property_type TEXT NOT NULL,
        transaction_type TEXT NOT NULL,
        price INTEGER NOT NULL,
        size INTEGER NOT NULL,
        alcaldia TEXT NOT NULL,
        colonia TEXT NOT NULL,
        street TEXT,
        bedrooms TEXT,
        bathrooms TEXT,
        features TEXT[],
        comments TEXT,
        agent_name TEXT NOT NULL,
        agent_phone TEXT NOT NULL,
        agent_email TEXT NOT NULL,
        agent_company TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Crear tabla de agent_client_listings si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS agent_client_listings (
        id SERIAL PRIMARY KEY,
        property_type TEXT NOT NULL,
        transaction_type TEXT NOT NULL,
        price INTEGER NOT NULL,
        size INTEGER NOT NULL,
        alcaldia TEXT NOT NULL,
        colonia TEXT NOT NULL,
        street TEXT,
        bedrooms TEXT,
        bathrooms TEXT,
        features TEXT[],
        has_credit BOOLEAN NOT NULL,
        credit_type TEXT,
        credit_amount INTEGER,
        needs_financing BOOLEAN,
        agent_name TEXT NOT NULL,
        agent_phone TEXT NOT NULL,
        agent_email TEXT NOT NULL,
        agent_company TEXT,
        client_name TEXT NOT NULL,
        client_phone TEXT NOT NULL,
        client_email TEXT NOT NULL,
        comments TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Crear tabla para el administrador si no existe
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Base de datos inicializada correctamente");
  } catch (error) {
    console.error("Error inicializando la base de datos:", error);
    throw error;
  }
}

// Función para cerrar la conexión (útil para detener la aplicación correctamente)
export async function closeDatabase() {
  await pool.end();
}