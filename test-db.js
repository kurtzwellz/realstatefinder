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

    // Comprobar estructura de las tablas
    console.log('\n=== Estructura de las tablas ===');
    
    const tables = ['client_requests', 'property_listings', 'agent_client_listings'];
    
    for (const table of tables) {
      console.log(`\nEstructura de la tabla ${table}:`);
      const { rows } = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [table]);
      
      console.table(rows);
    }
    
    // Probar inserción
    console.log('\n=== Prueba de inserción ===');
    
    const testFeatures = ['Estacionamiento', 'Jardín', 'Seguridad 24 horas'];
    
    console.log('Insertando datos de prueba en client_requests...');
    const insertResult = await client.query(`
      INSERT INTO client_requests (
        property_type, alcaldia, colonia, bedrooms, 
        bathrooms, features, has_credit, contact_name, 
        contact_phone, contact_email, created_at
      ) VALUES (
        'Casa', 'Miguel Hidalgo', 'Polanco', '3', 
        '2', $1, true, 'Usuario Prueba', 
        '5555555555', 'test@example.com', NOW()
      ) RETURNING id
    `, [JSON.stringify(testFeatures)]);
    
    const insertedId = insertResult.rows[0].id;
    console.log(`Registro insertado con ID: ${insertedId}`);
    
    // Recuperar el registro insertado
    console.log('\nRecuperando el registro insertado...');
    const { rows } = await client.query('SELECT * FROM client_requests WHERE id = $1', [insertedId]);
    console.log('Registro recuperado:');
    console.log(rows[0]);
    
    // Eliminar el registro de prueba
    console.log('\nEliminando registro de prueba...');
    await client.query('DELETE FROM client_requests WHERE id = $1', [insertedId]);
    console.log('Registro eliminado correctamente');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\nConexión a la base de datos cerrada');
  }
}

main();