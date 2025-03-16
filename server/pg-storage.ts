import { IStorage } from './storage';
import {
  type ClientRequest, 
  type InsertClientRequest, 
  type PropertyListing, 
  type InsertPropertyListing,
  type AgentClientListing,
  type InsertAgentClientListing
} from '@shared/schema';
import { db } from './db';
import { desc, eq, sql } from 'drizzle-orm';
import { clientRequests, propertyListings, agentClientListings } from '@shared/schema';

export class PostgresStorage implements IStorage {
  constructor() {
    console.log('PostgreSQL storage initialized');
  }

  // ========== Client requests operations ==========
  async getClientRequests(): Promise<ClientRequest[]> {
    try {
      // Obtener todas las solicitudes de clientes ordenadas por fecha de creación descendente
      const requests = await db.select().from(clientRequests).orderBy(desc(clientRequests.createdAt));
      return requests;
    } catch (error) {
      console.error('Error al obtener solicitudes de clientes:', error);
      throw error;
    }
  }

  async getClientRequest(id: number): Promise<ClientRequest | undefined> {
    try {
      // Obtener una solicitud de cliente específica por ID
      const [request] = await db.select()
        .from(clientRequests)
        .where(eq(clientRequests.id, id));
      
      return request;
    } catch (error) {
      console.error(`Error al obtener solicitud de cliente ${id}:`, error);
      throw error;
    }
  }

  async createClientRequest(request: InsertClientRequest): Promise<ClientRequest> {
    try {
      // Insertar nueva solicitud de cliente
      const [createdRequest] = await db.insert(clientRequests)
        .values({
          ...request,
          createdAt: new Date().toISOString()
        })
        .returning();
      
      return createdRequest;
    } catch (error) {
      console.error('Error al crear solicitud de cliente:', error);
      throw error;
    }
  }

  // ========== Property listings operations ==========
  async getPropertyListings(): Promise<PropertyListing[]> {
    try {
      // Obtener todos los listados de propiedades ordenados por fecha de creación descendente
      const listings = await db.select().from(propertyListings).orderBy(desc(propertyListings.createdAt));
      return listings;
    } catch (error) {
      console.error('Error al obtener listados de propiedades:', error);
      throw error;
    }
  }

  async getPropertyListing(id: number): Promise<PropertyListing | undefined> {
    try {
      // Obtener un listado de propiedad específico por ID
      const [listing] = await db.select()
        .from(propertyListings)
        .where(eq(propertyListings.id, id));
      
      return listing;
    } catch (error) {
      console.error(`Error al obtener listado de propiedad ${id}:`, error);
      throw error;
    }
  }

  async createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing> {
    try {
      // Insertar nuevo listado de propiedad
      const [createdListing] = await db.insert(propertyListings)
        .values({
          ...listing,
          createdAt: new Date().toISOString()
        })
        .returning();
      
      return createdListing;
    } catch (error) {
      console.error('Error al crear listado de propiedad:', error);
      throw error;
    }
  }

  // ========== Agent-client listings operations ==========
  async getAgentClientListings(): Promise<AgentClientListing[]> {
    try {
      // Obtener todos los listados de agente-cliente ordenados por fecha de creación descendente
      const listings = await db.select().from(agentClientListings).orderBy(desc(agentClientListings.createdAt));
      return listings;
    } catch (error) {
      console.error('Error al obtener listados de agente-cliente:', error);
      throw error;
    }
  }

  async getAgentClientListing(id: number): Promise<AgentClientListing | undefined> {
    try {
      // Obtener un listado de agente-cliente específico por ID
      const [listing] = await db.select()
        .from(agentClientListings)
        .where(eq(agentClientListings.id, id));
      
      return listing;
    } catch (error) {
      console.error(`Error al obtener listado de agente-cliente ${id}:`, error);
      throw error;
    }
  }

  async createAgentClientListing(listing: InsertAgentClientListing): Promise<AgentClientListing> {
    try {
      // Insertar nuevo listado de agente-cliente
      const [createdListing] = await db.insert(agentClientListings)
        .values({
          ...listing,
          createdAt: new Date().toISOString()
        })
        .returning();
      
      return createdListing;
    } catch (error) {
      console.error('Error al crear listado de agente-cliente:', error);
      throw error;
    }
  }
}