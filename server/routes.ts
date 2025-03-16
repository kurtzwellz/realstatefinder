import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PostgresStorage } from "./pg-storage";
import { 
  insertClientRequestSchema, 
  insertPropertyListingSchema, 
  insertAgentClientListingSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import expressSession from "express-session";
import { adminRouter } from "./admin-routes";
import * as dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Determinar qué almacenamiento usar (en memoria o PostgreSQL)
const usePostgres = process.env.DATABASE_URL ? true : false;
const storageImplementation = usePostgres ? new PostgresStorage() : storage;
console.log(`Usando almacenamiento: ${usePostgres ? 'PostgreSQL' : 'En memoria'}`);

export async function registerRoutes(app: Express): Promise<Server> {
  // Configurar middleware de sesión
  app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'default_secret_change_this',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
  }));

  // Registrar rutas de administración
  app.use('/api/admin', adminRouter);
  
  // Add CORS headers for development
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Validation error handler
  const validateRequest = (schema: any, data: any) => {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        throw new Error(validationError.message);
      }
      throw error;
    }
  };

  // Client request endpoints
  app.post("/api/client-requests", async (req, res) => {
    try {
      const validatedData = validateRequest(insertClientRequestSchema, req.body);
      const result = await storageImplementation.createClientRequest(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/client-requests", async (req, res) => {
    try {
      const clientRequests = await storageImplementation.getClientRequests();
      res.status(200).json(clientRequests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/client-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const clientRequest = await storageImplementation.getClientRequest(id);
      
      if (!clientRequest) {
        return res.status(404).json({ message: "Client request not found" });
      }
      
      res.status(200).json(clientRequest);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Property listing endpoints
  app.post("/api/property-listings", async (req, res) => {
    try {
      const validatedData = validateRequest(insertPropertyListingSchema, req.body);
      const result = await storageImplementation.createPropertyListing(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/property-listings", async (req, res) => {
    try {
      const propertyListings = await storageImplementation.getPropertyListings();
      res.status(200).json(propertyListings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/property-listings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const propertyListing = await storageImplementation.getPropertyListing(id);
      
      if (!propertyListing) {
        return res.status(404).json({ message: "Property listing not found" });
      }
      
      res.status(200).json(propertyListing);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Agent-client listing endpoints
  app.post("/api/agent-client-listings", async (req, res) => {
    try {
      const validatedData = validateRequest(insertAgentClientListingSchema, req.body);
      const result = await storageImplementation.createAgentClientListing(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/agent-client-listings", async (req, res) => {
    try {
      const agentClientListings = await storageImplementation.getAgentClientListings();
      res.status(200).json(agentClientListings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/agent-client-listings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const agentClientListing = await storageImplementation.getAgentClientListing(id);
      
      if (!agentClientListing) {
        return res.status(404).json({ message: "Agent-client listing not found" });
      }
      
      res.status(200).json(agentClientListing);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
