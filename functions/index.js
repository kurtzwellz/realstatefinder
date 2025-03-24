const { onRequest } = require('firebase-functions/v2/https');
const { logger } = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();

// Permitir solicitudes CORS desde cualquier origen
app.use(cors({ origin: true }));

// Middleware para parsear las solicitudes JSON
app.use(express.json());

// Registrar todas las solicitudes para depuración
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, { structuredData: true });
  next();
});

// Ruta para verificar que la API está funcionando
app.get('/', (req, res) => {
  res.status(200).json({ message: 'La API de Firebase Functions está funcionando correctamente.' });
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'La API de Firebase Functions está funcionando correctamente.' });
});

// Ruta para manejar solicitudes de clientes
app.post('/client-requests', async (req, res) => {
  try {
    // Obtenemos los datos del cliente del cuerpo de la solicitud
    const clientData = req.body;
    
    // Añadimos timestamp de creación
    const dataToStore = {
      ...clientData,
      createdAt: new Date().toISOString()
    };
    
    // Guardamos los datos en Firestore
    const docRef = await admin.firestore().collection('clientRequests').add(dataToStore);
    
    logger.info('Solicitud de cliente guardada en Firestore con ID:', docRef.id);
    
    // Devolvemos una respuesta exitosa con el ID generado por Firestore
    res.status(201).json({
      id: docRef.id,
      ...dataToStore
    });
  } catch (error) {
    logger.error('Error procesando solicitud de cliente:', error);
    res.status(500).json({ error: 'Error interno al procesar la solicitud' });
  }
});

// Ruta para manejar propiedades de agentes
app.post('/property-listings', async (req, res) => {
  try {
    // Obtenemos los datos de la propiedad del cuerpo de la solicitud
    const propertyData = req.body;
    
    // Añadimos timestamp de creación
    const dataToStore = {
      ...propertyData,
      createdAt: new Date().toISOString()
    };
    
    // Guardamos los datos en Firestore
    const docRef = await admin.firestore().collection('propertyListings').add(dataToStore);
    
    logger.info('Propiedad guardada en Firestore con ID:', docRef.id);
    
    // Devolvemos una respuesta exitosa con el ID generado por Firestore
    res.status(201).json({
      id: docRef.id,
      ...dataToStore
    });
  } catch (error) {
    logger.error('Error procesando propiedad:', error);
    res.status(500).json({ error: 'Error interno al procesar la propiedad' });
  }
});

// Ruta para manejar propiedades de agentes con clientes
app.post('/agent-client-listings', async (req, res) => {
  try {
    // Obtenemos los datos de la relación agente-cliente del cuerpo de la solicitud
    const agentClientData = req.body;
    
    // Añadimos timestamp de creación
    const dataToStore = {
      ...agentClientData,
      createdAt: new Date().toISOString()
    };
    
    // Guardamos los datos en Firestore
    const docRef = await admin.firestore().collection('agentClientListings').add(dataToStore);
    
    logger.info('Registro de agente-cliente guardado en Firestore con ID:', docRef.id);
    
    // Devolvemos una respuesta exitosa con el ID generado por Firestore
    res.status(201).json({
      id: docRef.id,
      ...dataToStore
    });
  } catch (error) {
    logger.error('Error procesando registro agente-cliente:', error);
    res.status(500).json({ error: 'Error interno al procesar el registro' });
  }
});

// Exponemos la aplicación Express como una función de Firebase usando la v2
exports.api = onRequest(
  {
    cors: true,
    maxInstances: 10,
    region: ["us-central1"],
    invoker: 'public',  // permitir acceso público
    timeoutSeconds: 60  // aumentar el tiempo límite a 60 segundos
  }, 
  app
); 