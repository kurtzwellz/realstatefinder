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
      // Preparar los datos para insertar eliminando campos no existentes en el esquema
      // Verificar que los datos de array sean procesados correctamente como JSON
      const insertData = {
        propertyType: request.propertyType,
        alcaldia: request.alcaldia,
        colonia: request.colonia,
        street: request.street || null,
        bedrooms: request.bedrooms || null,
        bathrooms: request.bathrooms || null,
        minSize: request.minSize || null,
        maxBudget: request.maxBudget || null,
        // Pasar el array directamente para que Drizzle lo maneje como JSONB
        features: request.features || null,
        hasCredit: request.hasCredit,
        creditType: request.creditType || null,
        creditAmount: request.creditAmount || null,
        needsFinancing: request.needsFinancing || null,
        contactName: request.contactName,
        contactPhone: request.contactPhone,
        contactEmail: request.contactEmail,
        contactTime: request.contactTime || null,
        comments: request.comments || null,
        createdAt: new Date().toISOString()
      };
      
      const [createdRequest] = await db.insert(clientRequests)
        .values([insertData])
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
      // Preparar los datos para insertar eliminando campos no existentes en el esquema
      const insertData = {
        propertyType: listing.propertyType,
        transactionType: listing.transactionType,
        price: listing.price,
        size: listing.size,
        alcaldia: listing.alcaldia,
        colonia: listing.colonia,
        street: listing.street || null,
        bedrooms: listing.bedrooms || null,
        bathrooms: listing.bathrooms || null,
        // Pasar el array directamente para que Drizzle lo maneje como JSONB
        features: listing.features || null,
        agentName: listing.agentName,
        agentPhone: listing.agentPhone,
        agentEmail: listing.agentEmail,
        agentCompany: listing.agentCompany || null,
        comments: listing.comments || null,
        createdAt: new Date().toISOString()
      };
      
      const [createdListing] = await db.insert(propertyListings)
        .values([insertData])
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
      // Preparar los datos para insertar eliminando campos no existentes en el esquema
      const insertData = {
        propertyType: listing.propertyType,
        transactionType: listing.transactionType,
        price: listing.price,
        size: listing.size,
        alcaldia: listing.alcaldia,
        colonia: listing.colonia,
        street: listing.street || null,
        bedrooms: listing.bedrooms || null,
        bathrooms: listing.bathrooms || null,
        // Pasar el array directamente para que Drizzle lo maneje como JSONB
        features: listing.features || null,
        // Información del agente
        agentName: listing.agentName,
        agentPhone: listing.agentPhone,
        agentEmail: listing.agentEmail,
        agentCompany: listing.agentCompany || null,
        // Información del cliente
        clientName: listing.clientName,
        clientPhone: listing.clientPhone,
        clientEmail: listing.clientEmail,
        hasCredit: listing.hasCredit,
        creditType: listing.creditType || null,
        creditAmount: listing.creditAmount || null,
        needsFinancing: listing.needsFinancing || null,
        comments: listing.comments || null,
        createdAt: new Date().toISOString()
      };
      
      const [createdListing] = await db.insert(agentClientListings)
        .values([insertData])
        .returning();
      
      return createdListing;
    } catch (error) {
      console.error('Error al crear listado de agente-cliente:', error);
      throw error;
    }
  }
}