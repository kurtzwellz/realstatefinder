import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Common types shared between forms
export const contactInfo = z.object({
  fullName: z.string().min(1, "Nombre es requerido"),
  phone: z.string().min(8, "Teléfono válido es requerido"),
  email: z.string().email("Correo electrónico válido es requerido"),
  contactTime: z.string().optional(),
  additionalComments: z.string().optional(),
  acceptPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "Debe aceptar la política de privacidad"
  })
});

// Property lookup requests (Cliente)
export const clientRequests = pgTable("client_requests", {
  id: serial("id").primaryKey(),
  propertyType: text("property_type").notNull(),
  alcaldia: text("alcaldia").notNull(),
  colonia: text("colonia").notNull(),
  street: text("street"),
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  minSize: integer("min_size"),
  maxBudget: integer("max_budget"),
  features: json("features").$type<string[]>(),
  hasCredit: boolean("has_credit").notNull(),
  creditType: text("credit_type"),
  creditAmount: integer("credit_amount"),
  needsFinancing: boolean("needs_financing"),
  contactName: text("contact_name").notNull(),
  contactPhone: text("contact_phone").notNull(),
  contactEmail: text("contact_email").notNull(),
  contactTime: text("contact_time"),
  comments: text("comments"),
  createdAt: text("created_at").notNull()
});

// Property listings (Asesor)
export const propertyListings = pgTable("property_listings", {
  id: serial("id").primaryKey(),
  propertyType: text("property_type").notNull(),
  transactionType: text("transaction_type").notNull(),
  price: integer("price").notNull(),
  size: integer("size").notNull(),
  alcaldia: text("alcaldia").notNull(),
  colonia: text("colonia").notNull(),
  street: text("street"),
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  features: json("features").$type<string[]>(),
  agentName: text("agent_name").notNull(),
  agentPhone: text("agent_phone").notNull(),
  agentEmail: text("agent_email").notNull(),
  agentCompany: text("agent_company"),
  comments: text("comments"),
  createdAt: text("created_at").notNull()
});

// Combined Agent-Client submissions (Asesor con Cliente)
export const agentClientListings = pgTable("agent_client_listings", {
  id: serial("id").primaryKey(),
  // Property information
  propertyType: text("property_type").notNull(),
  transactionType: text("transaction_type").notNull(),
  price: integer("price").notNull(),
  size: integer("size").notNull(),
  alcaldia: text("alcaldia").notNull(),
  colonia: text("colonia").notNull(),
  street: text("street"),
  bedrooms: text("bedrooms"),
  bathrooms: text("bathrooms"),
  features: json("features").$type<string[]>(),
  // Agent information
  agentName: text("agent_name").notNull(),
  agentPhone: text("agent_phone").notNull(),
  agentEmail: text("agent_email").notNull(),
  agentCompany: text("agent_company"),
  // Client information
  clientName: text("client_name").notNull(),
  clientPhone: text("client_phone").notNull(),
  clientEmail: text("client_email").notNull(),
  hasCredit: boolean("has_credit").notNull(),
  creditType: text("credit_type"),
  creditAmount: integer("credit_amount"),
  needsFinancing: boolean("needs_financing"),
  comments: text("comments"),
  createdAt: text("created_at").notNull()
});

// Schema validation for forms
export const insertClientRequestSchema = createInsertSchema(clientRequests).omit({ id: true, createdAt: true });
export const insertPropertyListingSchema = createInsertSchema(propertyListings).omit({ id: true, createdAt: true });
export const insertAgentClientListingSchema = createInsertSchema(agentClientListings).omit({ id: true, createdAt: true });

// Types
export type InsertClientRequest = z.infer<typeof insertClientRequestSchema>;
export type ClientRequest = typeof clientRequests.$inferSelect;

export type InsertPropertyListing = z.infer<typeof insertPropertyListingSchema>;
export type PropertyListing = typeof propertyListings.$inferSelect;

export type InsertAgentClientListing = z.infer<typeof insertAgentClientListingSchema>;
export type AgentClientListing = typeof agentClientListings.$inferSelect;
