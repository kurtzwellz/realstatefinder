import { Router, Request, Response } from 'express';
import { isAuthenticated, verifyCredentials } from './auth';
import { PostgresStorage } from './pg-storage';
import * as bcrypt from 'bcryptjs';

// Crear un router para las rutas de administración
const adminRouter = Router();
const storage = new PostgresStorage();

// Ruta para inicio de sesión
adminRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Se requiere nombre de usuario y contraseña' });
    }
    
    // Verificar credenciales
    const isValid = await verifyCredentials(username, password);
    
    if (isValid) {
      // Establecer sesión de autenticación
      req.session.isAuthenticated = true;
      req.session.username = username;
      
      return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en inicio de sesión:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para cerrar sesión
adminRouter.post('/logout', (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
    
    res.clearCookie('connect.sid');
    return res.status(200).json({ message: 'Sesión cerrada correctamente' });
  });
});

// Ruta para verificar si está autenticado
adminRouter.get('/check-auth', (req: Request, res: Response) => {
  if (req.session && req.session.isAuthenticated) {
    return res.status(200).json({ isAuthenticated: true });
  } else {
    return res.status(401).json({ isAuthenticated: false });
  }
});

// Rutas protegidas (requieren autenticación)
// Obtener todas las solicitudes de clientes
adminRouter.get('/client-requests', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const clientRequests = await storage.getClientRequests();
    return res.status(200).json(clientRequests);
  } catch (error) {
    console.error('Error obteniendo solicitudes de clientes:', error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

// Obtener todos los listados de propiedades
adminRouter.get('/property-listings', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const propertyListings = await storage.getPropertyListings();
    return res.status(200).json(propertyListings);
  } catch (error) {
    console.error('Error obteniendo listados de propiedades:', error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

// Obtener todos los listados de agentes con clientes
adminRouter.get('/agent-client-listings', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const agentClientListings = await storage.getAgentClientListings();
    return res.status(200).json(agentClientListings);
  } catch (error) {
    console.error('Error obteniendo listados de agentes con clientes:', error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

// Obtener una solicitud de cliente específica por ID
adminRouter.get('/client-requests/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    const clientRequest = await storage.getClientRequest(id);
    if (!clientRequest) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }
    
    return res.status(200).json(clientRequest);
  } catch (error) {
    console.error(`Error obteniendo solicitud de cliente ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

// Obtener un listado de propiedad específico por ID
adminRouter.get('/property-listings/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    const propertyListing = await storage.getPropertyListing(id);
    if (!propertyListing) {
      return res.status(404).json({ message: 'Listado no encontrado' });
    }
    
    return res.status(200).json(propertyListing);
  } catch (error) {
    console.error(`Error obteniendo listado de propiedad ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

// Obtener un listado de agente con cliente específico por ID
adminRouter.get('/agent-client-listings/:id', isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'ID inválido' });
    }
    
    const agentClientListing = await storage.getAgentClientListing(id);
    if (!agentClientListing) {
      return res.status(404).json({ message: 'Listado no encontrado' });
    }
    
    return res.status(200).json(agentClientListing);
  } catch (error) {
    console.error(`Error obteniendo listado de agente con cliente ${req.params.id}:`, error);
    return res.status(500).json({ message: 'Error obteniendo datos' });
  }
});

export { adminRouter };