import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertClientRequestSchema, 
  insertPropertyListingSchema, 
  insertAgentClientListingSchema 
} from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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
      const result = await storage.createClientRequest(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/client-requests", async (req, res) => {
    try {
      const clientRequests = await storage.getClientRequests();
      res.status(200).json(clientRequests);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/client-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const clientRequest = await storage.getClientRequest(id);
      
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
      const result = await storage.createPropertyListing(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/property-listings", async (req, res) => {
    try {
      const propertyListings = await storage.getPropertyListings();
      res.status(200).json(propertyListings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/property-listings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const propertyListing = await storage.getPropertyListing(id);
      
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
      const result = await storage.createAgentClientListing(validatedData);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/agent-client-listings", async (req, res) => {
    try {
      const agentClientListings = await storage.getAgentClientListings();
      res.status(200).json(agentClientListings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/agent-client-listings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const agentClientListing = await storage.getAgentClientListing(id);
      
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
