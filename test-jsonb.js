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

    // Comprobar estructura de la tabla
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
    
    // Probar inserción con JSONB
    console.log('\n=== Prueba de inserción con JSONB ===');
    
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
      ) RETURNING id, features
    `, [JSON.stringify(testFeatures)]);
    
    const insertedRow = insertResult.rows[0];
    console.log(`Registro insertado con ID: ${insertedRow.id}`);
    console.log('Features guardados:', insertedRow.features);
    console.log('Tipo de features:', typeof insertedRow.features);
    
    // Recuperar el registro insertado
    console.log('\nRecuperando el registro insertado...');
    const { rows } = await client.query('SELECT * FROM client_requests WHERE id = $1', [insertedRow.id]);
    console.log('Registro recuperado:');
    console.log(rows[0]);
    
    // Probar operaciones con JSONB
    console.log('\n=== Prueba de operaciones con JSONB ===');
    console.log('Buscando propiedades con "Jardín" en features:');
    const jsonbQuery = await client.query(`
      SELECT id, property_type, features 
      FROM client_requests 
      WHERE features @> $1
      ORDER BY id DESC
      LIMIT 5
    `, [JSON.stringify(['Jardín'])]);
    
    console.log('Resultados encontrados:', jsonbQuery.rows.length);
    console.table(jsonbQuery.rows);
    
    // Eliminar el registro de prueba
    console.log('\nEliminando registro de prueba...');
    await client.query('DELETE FROM client_requests WHERE id = $1', [insertedRow.id]);
    console.log('Registro eliminado correctamente');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
    console.log('\nConexión a la base de datos cerrada');
  }
}

main();