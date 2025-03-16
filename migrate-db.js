// Script para migrar la base de datos usando node
import { drizzle } from 'drizzle-orm/postgres-js';
import { sql } from 'drizzle-orm';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("No DATABASE_URL environment variable found");
  process.exit(1);
}

async function main() {
  // Configurar cliente de postgres
  const client = postgres(databaseUrl);
  const db = drizzle(client);

  console.log("Creando/actualizando tablas en la base de datos...");
  
  try {
    // Esto creará las tablas basadas en el esquema importado
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS client_requests (
        id SERIAL PRIMARY KEY,
        property_type VARCHAR(255) NOT NULL,
        alcaldia VARCHAR(255) NOT NULL,
        colonia VARCHAR(255) NOT NULL,
        street VARCHAR(255),
        bedrooms VARCHAR(255),
        bathrooms VARCHAR(255),
        min_size INTEGER,
        max_budget INTEGER,
        features JSONB,
        has_credit BOOLEAN NOT NULL,
        credit_type VARCHAR(255),
        credit_amount INTEGER,
        needs_financing BOOLEAN,
        contact_name VARCHAR(255) NOT NULL,
        contact_phone VARCHAR(255) NOT NULL,
        contact_email VARCHAR(255) NOT NULL,
        contact_time VARCHAR(255),
        comments TEXT,
        created_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS property_listings (
        id SERIAL PRIMARY KEY,
        property_type VARCHAR(255) NOT NULL,
        transaction_type VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        size INTEGER NOT NULL,
        alcaldia VARCHAR(255) NOT NULL,
        colonia VARCHAR(255) NOT NULL,
        street VARCHAR(255),
        bedrooms VARCHAR(255),
        bathrooms VARCHAR(255),
        features JSONB,
        agent_name VARCHAR(255) NOT NULL,
        agent_phone VARCHAR(255) NOT NULL,
        agent_email VARCHAR(255) NOT NULL,
        agent_company VARCHAR(255),
        comments TEXT,
        created_at TIMESTAMP NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS agent_client_listings (
        id SERIAL PRIMARY KEY,
        property_type VARCHAR(255) NOT NULL,
        transaction_type VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        size INTEGER NOT NULL,
        alcaldia VARCHAR(255) NOT NULL,
        colonia VARCHAR(255) NOT NULL,
        street VARCHAR(255),
        bedrooms VARCHAR(255),
        bathrooms VARCHAR(255),
        features JSONB,
        agent_name VARCHAR(255) NOT NULL,
        agent_phone VARCHAR(255) NOT NULL,
        agent_email VARCHAR(255) NOT NULL,
        agent_company VARCHAR(255),
        client_name VARCHAR(255) NOT NULL,
        client_phone VARCHAR(255) NOT NULL,
        client_email VARCHAR(255) NOT NULL,
        has_credit BOOLEAN NOT NULL,
        credit_type VARCHAR(255),
        credit_amount INTEGER,
        needs_financing BOOLEAN,
        comments TEXT,
        created_at TIMESTAMP NOT NULL
      );
    `);
    
    console.log("Tablas creadas/actualizadas exitosamente");
  } catch (error) {
    console.error("Error al crear/actualizar tablas:", error);
  } finally {
    await client.end();
    console.log("Conexión a la base de datos cerrada");
  }
}

main();