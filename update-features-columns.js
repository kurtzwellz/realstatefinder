import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
dotenv.config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Conectado a la base de datos PostgreSQL');

    // Actualizar tipo de columna para las tres tablas
    console.log('Actualizando columnas features a tipo JSONB...');
    
    // Convertir columnas de tipo TEXT[] a JSONB
    await client.query(`
      -- Cliente requests
      ALTER TABLE IF EXISTS client_requests 
      ALTER COLUMN features TYPE JSONB USING features::jsonb;
      
      -- Property listings
      ALTER TABLE IF EXISTS property_listings 
      ALTER COLUMN features TYPE JSONB USING features::jsonb;
      
      -- Agent-client listings
      ALTER TABLE IF EXISTS agent_client_listings 
      ALTER COLUMN features TYPE JSONB USING features::jsonb;
    `);
    
    console.log('Columnas actualizadas exitosamente');
  } catch (error) {
    console.error('Error al actualizar columnas:', error);
  } finally {
    await client.end();
    console.log('Conexión a la base de datos cerrada');
  }
}

main();