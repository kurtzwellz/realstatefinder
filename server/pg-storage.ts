import { 
  IStorage,
  ClientRequest, 
  InsertClientRequest, 
  PropertyListing, 
  InsertPropertyListing, 
  AgentClientListing, 
  InsertAgentClientListing 
} from './storage';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { clientRequests, propertyListings, agentClientListings } from '../shared/schema';

export class PostgresStorage implements IStorage {
  constructor() {
    console.log('Utilizando PostgreSQL para almacenamiento');
  }
  
  // Client requests (búsqueda de propiedades)
  async getClientRequests(): Promise<ClientRequest[]> {
    try {
      const result = await db.query.clientRequests.findMany({
        orderBy: (clientRequests, { desc }) => [desc(clientRequests.createdAt)]
      });
      return result;
    } catch (error) {
      console.error('Error obteniendo solicitudes de clientes:', error);
      return [];
    }
  }
  
  async getClientRequest(id: number): Promise<ClientRequest | undefined> {
    try {
      const result = await db.query.clientRequests.findFirst({
        where: eq(clientRequests.id, id)
      });
      return result || undefined;
    } catch (error) {
      console.error(`Error obteniendo solicitud de cliente ${id}:`, error);
      return undefined;
    }
  }
  
  async createClientRequest(request: InsertClientRequest): Promise<ClientRequest> {
    try {
      // Asegurarse de que los campos opcionales estén configurados como null si no están presentes
      const sanitizedRequest = {
        ...request,
        street: request.street || null,
        bedrooms: request.bedrooms || null,
        bathrooms: request.bathrooms || null,
        minSize: request.minSize || null,
        maxBudget: request.maxBudget || null,
        creditType: request.creditType || null,
        creditAmount: request.creditAmount || null,
        needsFinancing: request.needsFinancing || false,
        comments: request.comments || null
      };
      
      const result = await db.execute(
        `INSERT INTO client_requests (
          property_type, alcaldia, colonia, street, bedrooms, bathrooms, 
          min_size, max_budget, has_credit, credit_type, credit_amount, 
          needs_financing, contact_name, contact_phone, contact_email, comments
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
        ) RETURNING *`,
        [
          sanitizedRequest.propertyType,
          sanitizedRequest.alcaldia,
          sanitizedRequest.colonia,
          sanitizedRequest.street,
          sanitizedRequest.bedrooms,
          sanitizedRequest.bathrooms,
          sanitizedRequest.minSize,
          sanitizedRequest.maxBudget,
          sanitizedRequest.hasCredit,
          sanitizedRequest.creditType,
          sanitizedRequest.creditAmount,
          sanitizedRequest.needsFinancing,
          sanitizedRequest.contactName,
          sanitizedRequest.contactPhone,
          sanitizedRequest.contactEmail,
          sanitizedRequest.comments
        ]
      );
      
      // Convertir el resultado a formato camelCase para mantener consistencia
      const row = result.rows[0];
      return {
        id: row.id,
        propertyType: row.property_type,
        alcaldia: row.alcaldia,
        colonia: row.colonia,
        street: row.street,
        bedrooms: row.bedrooms,
        bathrooms: row.bathrooms,
        minSize: row.min_size,
        maxBudget: row.max_budget,
        hasCredit: row.has_credit,
        creditType: row.credit_type,
        creditAmount: row.credit_amount,
        needsFinancing: row.needs_financing,
        contactName: row.contact_name,
        contactPhone: row.contact_phone,
        contactEmail: row.contact_email,
        comments: row.comments,
        createdAt: row.created_at.toISOString()
      };
    } catch (error) {
      console.error('Error creando solicitud de cliente:', error);
      throw new Error('No se pudo crear la solicitud del cliente');
    }
  }
  
  // Property listings (de agentes)
  async getPropertyListings(): Promise<PropertyListing[]> {
    try {
      const result = await db.query.propertyListings.findMany({
        orderBy: (propertyListings, { desc }) => [desc(propertyListings.createdAt)]
      });
      return result;
    } catch (error) {
      console.error('Error obteniendo listados de propiedades:', error);
      return [];
    }
  }
  
  async getPropertyListing(id: number): Promise<PropertyListing | undefined> {
    try {
      const result = await db.query.propertyListings.findFirst({
        where: eq(propertyListings.id, id)
      });
      return result || undefined;
    } catch (error) {
      console.error(`Error obteniendo listado de propiedad ${id}:`, error);
      return undefined;
    }
  }
  
  async createPropertyListing(listing: InsertPropertyListing): Promise<PropertyListing> {
    try {
      // Asegurarse de que los campos opcionales estén configurados como null si no están presentes
      const sanitizedListing = {
        ...listing,
        street: listing.street || null,
        bedrooms: listing.bedrooms || null,
        bathrooms: listing.bathrooms || null,
        features: listing.features || [],
        comments: listing.comments || null,
        agentCompany: listing.agentCompany || null
      };
      
      const result = await db.execute(
        `INSERT INTO property_listings (
          property_type, transaction_type, price, size, alcaldia, colonia, 
          street, bedrooms, bathrooms, features, comments, 
          agent_name, agent_phone, agent_email, agent_company
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        ) RETURNING *`,
        [
          sanitizedListing.propertyType,
          sanitizedListing.transactionType,
          sanitizedListing.price,
          sanitizedListing.size,
          sanitizedListing.alcaldia,
          sanitizedListing.colonia,
          sanitizedListing.street,
          sanitizedListing.bedrooms,
          sanitizedListing.bathrooms,
          sanitizedListing.features,
          sanitizedListing.comments,
          sanitizedListing.agentName,
          sanitizedListing.agentPhone,
          sanitizedListing.agentEmail,
          sanitizedListing.agentCompany
        ]
      );
      
      // Convertir el resultado a formato camelCase para mantener consistencia
      const row = result.rows[0];
      return {
        id: row.id,
        propertyType: row.property_type,
        transactionType: row.transaction_type,
        price: row.price,
        size: row.size,
        alcaldia: row.alcaldia,
        colonia: row.colonia,
        street: row.street,
        bedrooms: row.bedrooms,
        bathrooms: row.bathrooms,
        features: row.features,
        comments: row.comments,
        agentName: row.agent_name,
        agentPhone: row.agent_phone,
        agentEmail: row.agent_email,
        agentCompany: row.agent_company,
        createdAt: row.created_at.toISOString()
      };
    } catch (error) {
      console.error('Error creando listado de propiedad:', error);
      throw new Error('No se pudo crear el listado de la propiedad');
    }
  }
  
  // Agent-client listings (combinados)
  async getAgentClientListings(): Promise<AgentClientListing[]> {
    try {
      const result = await db.query.agentClientListings.findMany({
        orderBy: (agentClientListings, { desc }) => [desc(agentClientListings.createdAt)]
      });
      return result;
    } catch (error) {
      console.error('Error obteniendo listados de agente-cliente:', error);
      return [];
    }
  }
  
  async getAgentClientListing(id: number): Promise<AgentClientListing | undefined> {
    try {
      const result = await db.query.agentClientListings.findFirst({
        where: eq(agentClientListings.id, id)
      });
      return result || undefined;
    } catch (error) {
      console.error(`Error obteniendo listado de agente-cliente ${id}:`, error);
      return undefined;
    }
  }
  
  async createAgentClientListing(listing: InsertAgentClientListing): Promise<AgentClientListing> {
    try {
      // Asegurarse de que los campos opcionales estén configurados como null si no están presentes
      const sanitizedListing = {
        ...listing,
        street: listing.street || null,
        bedrooms: listing.bedrooms || null,
        bathrooms: listing.bathrooms || null,
        features: listing.features || [],
        creditType: listing.creditType || null,
        creditAmount: listing.creditAmount || null,
        needsFinancing: listing.needsFinancing || false,
        comments: listing.comments || null,
        agentCompany: listing.agentCompany || null
      };
      
      const result = await db.execute(
        `INSERT INTO agent_client_listings (
          property_type, transaction_type, price, size, alcaldia, colonia, 
          street, bedrooms, bathrooms, features, has_credit, credit_type, 
          credit_amount, needs_financing, agent_name, agent_phone, agent_email, 
          agent_company, client_name, client_phone, client_email, comments
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        ) RETURNING *`,
        [
          sanitizedListing.propertyType,
          sanitizedListing.transactionType,
          sanitizedListing.price,
          sanitizedListing.size,
          sanitizedListing.alcaldia,
          sanitizedListing.colonia,
          sanitizedListing.street,
          sanitizedListing.bedrooms,
          sanitizedListing.bathrooms,
          sanitizedListing.features,
          sanitizedListing.hasCredit,
          sanitizedListing.creditType,
          sanitizedListing.creditAmount,
          sanitizedListing.needsFinancing,
          sanitizedListing.agentName,
          sanitizedListing.agentPhone,
          sanitizedListing.agentEmail,
          sanitizedListing.agentCompany,
          sanitizedListing.clientName,
          sanitizedListing.clientPhone,
          sanitizedListing.clientEmail,
          sanitizedListing.comments
        ]
      );
      
      // Convertir el resultado a formato camelCase para mantener consistencia
      const row = result.rows[0];
      return {
        id: row.id,
        propertyType: row.property_type,
        transactionType: row.transaction_type,
        price: row.price,
        size: row.size,
        alcaldia: row.alcaldia,
        colonia: row.colonia,
        street: row.street,
        bedrooms: row.bedrooms,
        bathrooms: row.bathrooms,
        features: row.features,
        hasCredit: row.has_credit,
        creditType: row.credit_type,
        creditAmount: row.credit_amount,
        needsFinancing: row.needs_financing,
        agentName: row.agent_name,
        agentPhone: row.agent_phone,
        agentEmail: row.agent_email,
        agentCompany: row.agent_company,
        clientName: row.client_name,
        clientPhone: row.client_phone,
        clientEmail: row.client_email,
        comments: row.comments,
        createdAt: row.created_at.toISOString()
      };
    } catch (error) {
      console.error('Error creando listado de agente-cliente:', error);
      throw new Error('No se pudo crear el listado de agente-cliente');
    }
  }
}