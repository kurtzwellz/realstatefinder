import { z } from "zod";

// Basic Client Form schema
export const clientFormSchema = z.object({
  // Property Information
  propertyType: z.string().min(1, "Seleccione un tipo de propiedad"),
  alcaldia: z.string().min(1, "Seleccione una alcaldía"),
  colonia: z.string().min(1, "Seleccione una colonia"),
  street: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  minSize: z.number().min(0, "Debe ser un número positivo").optional().nullable(),
  maxBudget: z.number().min(0, "Debe ser un número positivo").optional().nullable(),
  features: z.array(z.string()).optional().default([]),
  
  // Credit Information
  hasCredit: z.boolean().default(false),
  creditType: z.string().optional(),
  creditAmount: z.number().min(0, "Debe ser un número positivo").optional().nullable(),
  needsFinancing: z.boolean().optional().default(false),
  
  // Contact Information
  contactName: z.string().min(1, "Nombre es requerido"),
  contactPhone: z.string().min(8, "Teléfono válido es requerido"),
  contactEmail: z.string().email("Correo electrónico válido es requerido"),
  contactTime: z.string().optional(),
  comments: z.string().optional(),
  acceptPrivacyPolicy: z.boolean().default(false)
}).superRefine((data, ctx) => {
  // Si estamos en la validación del paso final o de la sección de crédito, 
  // verificamos las reglas específicas
  
  // Regla para cuando el usuario tiene crédito
  if (data.hasCredit) {
    if (!data.creditType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe especificar el tipo de crédito",
        path: ["creditType"]
      });
    }
    if (!data.creditAmount || data.creditAmount <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Debe especificar un monto de crédito válido",
        path: ["creditAmount"]
      });
    }
  }
  
  // Regla para la política de privacidad
  if (data.contactName && data.contactPhone && data.contactEmail && !data.acceptPrivacyPolicy) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Debe aceptar la política de privacidad",
      path: ["acceptPrivacyPolicy"]
    });
  }
});

// Agent Form schema
export const agentFormSchema = z.object({
  // Property Information
  propertyType: z.string().min(1, "Seleccione un tipo de propiedad"),
  transactionType: z.string().min(1, "Seleccione un tipo de operación"),
  price: z.number().min(1, "Ingrese un precio válido"),
  size: z.number().min(1, "Ingrese un tamaño válido"),
  alcaldia: z.string().min(1, "Seleccione una alcaldía"),
  colonia: z.string().min(1, "Seleccione una colonia"),
  street: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  features: z.array(z.string()).optional().default([]),
  
  // Agent Information
  agentName: z.string().min(1, "Nombre es requerido"),
  agentPhone: z.string().min(8, "Teléfono válido es requerido"),
  agentEmail: z.string().email("Correo electrónico válido es requerido"),
  agentCompany: z.string().optional(),
  comments: z.string().optional()
});

// Agent-Client Form schema
export const agentClientFormSchema = z.object({
  // Property Information
  propertyType: z.string().min(1, "Seleccione un tipo de propiedad"),
  transactionType: z.string().min(1, "Seleccione un tipo de operación"),
  price: z.number().min(1, "Ingrese un precio válido"),
  size: z.number().min(1, "Ingrese un tamaño válido"),
  alcaldia: z.string().min(1, "Seleccione una alcaldía"),
  colonia: z.string().min(1, "Seleccione una colonia"),
  street: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  features: z.array(z.string()).optional().default([]),
  
  // Agent Information
  agentName: z.string().min(1, "Nombre es requerido"),
  agentPhone: z.string().min(8, "Teléfono válido es requerido"),
  agentEmail: z.string().email("Correo electrónico válido es requerido"),
  agentCompany: z.string().optional(),
  
  // Client Information
  clientName: z.string().min(1, "Nombre del cliente es requerido"),
  clientPhone: z.string().min(8, "Teléfono del cliente es requerido"),
  clientEmail: z.string().email("Correo electrónico del cliente es requerido"),
  hasCredit: z.boolean(),
  creditType: z.string().optional(),
  creditAmount: z.number().min(0, "Debe ser un número positivo").optional(),
  needsFinancing: z.boolean().optional(),
  comments: z.string().optional()
}).refine(
  (data) => {
    // If client has credit, creditType and creditAmount are required
    if (data.hasCredit) {
      return !!data.creditType && data.creditAmount && data.creditAmount > 0;
    }
    return true;
  },
  {
    message: "Si el cliente tiene un crédito, debe especificar el tipo y monto",
    path: ["creditType", "creditAmount"]
  }
);
