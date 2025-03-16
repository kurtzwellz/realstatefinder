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

    // Verificar el tipo actual de la columna "features"
    const { rows: columnTypeInfo } = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'client_requests' AND column_name = 'features'
    `);
    
    console.log('Tipo actual de la columna features:', columnTypeInfo[0]?.data_type || 'No encontrado');
    
    // Modificar las columnas para cambiar de ARRAY a JSONB
    console.log('Modificando columna features a tipo JSONB...');
    
    // Para client_requests
    await client.query(`
      ALTER TABLE client_requests 
      DROP COLUMN features;
    `);
    
    await client.query(`
      ALTER TABLE client_requests 
      ADD COLUMN features JSONB;
    `);
    
    // Para property_listings
    await client.query(`
      ALTER TABLE property_listings 
      DROP COLUMN features;
    `);
    
    await client.query(`
      ALTER TABLE property_listings 
      ADD COLUMN features JSONB;
    `);
    
    // Para agent_client_listings
    await client.query(`
      ALTER TABLE agent_client_listings 
      DROP COLUMN features;
    `);
    
    await client.query(`
      ALTER TABLE agent_client_listings 
      ADD COLUMN features JSONB;
    `);
    
    console.log('Columnas features actualizadas a tipo JSONB');
    
    // Verificar el nuevo tipo de la columna
    const { rows: newColumnTypeInfo } = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'client_requests' AND column_name = 'features'
    `);
    
    console.log('Nuevo tipo de la columna features:', newColumnTypeInfo[0]?.data_type || 'No encontrado');
    
  } catch (error) {
    console.error('Error al modificar las columnas:', error);
  } finally {
    await client.end();
    console.log('Conexión a la base de datos cerrada');
  }
}

main();