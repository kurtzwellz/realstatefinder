import { 
  type ClientRequest, 
  type InsertClientRequest, 
  type PropertyListing, 
  type InsertPropertyListing,
  type AgentClientListing,
  type InsertAgentClientListing
} from "@shared/schema";

// Re-exportar los tipos para que estén disponibles en archivos que importen storage.ts
export type {
  ClientRequest,
  InsertClientRequest,
  PropertyListing,
  InsertPropertyListing,
  AgentClientListing,
  InsertAgentClientListing
};

export interface IStorage {
  // Client requests (property search)
  getClientRequests(): Promise<ClientRequest[]>;
  getClientRequest(id: number): Promise<ClientRequest | undefined>;
  createClientRequest(request: InsertClientRequest): Promise<ClientRequest>;
  
  // Property listings (from agents)
  getPropertyListings(): Promise<PropertyListing[]>;
  getPropertyListing(id: number): Promise<PropertyListing | undefined>;
  createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing>;
  
  // Agent-client combined listings
  getAgentClientListings(): Promise<AgentClientListing[]>;
  getAgentClientListing(id: number): Promise<AgentClientListing | undefined>;
  createAgentClientListing(listing: InsertAgentClientListing): Promise<AgentClientListing>;
}

export class MemStorage implements IStorage {
  private clientRequests: Map<number, ClientRequest>;
  private propertyListings: Map<number, PropertyListing>;
  private agentClientListings: Map<number, AgentClientListing>;
  
  private clientRequestId: number;
  private propertyListingId: number;
  private agentClientListingId: number;

  constructor() {
    this.clientRequests = new Map();
    this.propertyListings = new Map();
    this.agentClientListings = new Map();
    
    this.clientRequestId = 1;
    this.propertyListingId = 1;
    this.agentClientListingId = 1;
  }

  // Client requests methods
  async getClientRequests(): Promise<ClientRequest[]> {
    return Array.from(this.clientRequests.values());
  }

  async getClientRequest(id: number): Promise<ClientRequest | undefined> {
    return this.clientRequests.get(id);
  }

  async createClientRequest(request: InsertClientRequest): Promise<ClientRequest> {
    const id = this.clientRequestId++;
    const timestamp = new Date().toISOString();
    const clientRequest: ClientRequest = { 
      ...request, 
      id, 
      createdAt: timestamp 
    };
    this.clientRequests.set(id, clientRequest);
    return clientRequest;
  }

  // Property listings methods
  async getPropertyListings(): Promise<PropertyListing[]> {
    return Array.from(this.propertyListings.values());
  }

  async getPropertyListing(id: number): Promise<PropertyListing | undefined> {
    return this.propertyListings.get(id);
  }

  async createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing> {
    const id = this.propertyListingId++;
    const timestamp = new Date().toISOString();
    const propertyListing: PropertyListing = { 
      ...listing, 
      id, 
      createdAt: timestamp 
    };
    this.propertyListings.set(id, propertyListing);
    return propertyListing;
  }

  // Agent-client listings methods
  async getAgentClientListings(): Promise<AgentClientListing[]> {
    return Array.from(this.agentClientListings.values());
  }

  async getAgentClientListing(id: number): Promise<AgentClientListing | undefined> {
    return this.agentClientListings.get(id);
  }

  async createAgentClientListing(listing: InsertAgentClientListing): Promise<AgentClientListing> {
    const id = this.agentClientListingId++;
    const timestamp = new Date().toISOString();
    const agentClientListing: AgentClientListing = { 
      ...listing, 
      id, 
      createdAt: timestamp 
    };
    this.agentClientListings.set(id, agentClientListing);
    return agentClientListing;
  }
}

// Importar PostgresStorage para que pueda ser utilizado por routes.ts
import { PostgresStorage } from './pg-storage';

// La implementación del storage ahora se determina en routes.ts
// basada en la disponibilidad de la base de datos
export const storage = new MemStorage();
