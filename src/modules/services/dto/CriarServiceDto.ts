import { createInsertSchema } from "drizzle-zod";
import { services } from "@/infrastructure/db/schema/services";
import { z } from "zod";

// 1. Criamos o schema de validação herdando as propriedades de inserção do Drizzle
export const createServiceSchema = createInsertSchema(services, {
  name: (schema) => schema.min(3, { 
    message: "O nome do serviço deve ter pelo menos 3 caracteres." 
  }),
  description: (schema) => schema.max(255, { 
    message: "A descrição do serviço não pode passar de 255 caracteres." 
  }).optional(),
  departmentId: (schema) => schema.min(1, {
    message: "A associação a um departamento é obrigatória."
  }),
}).omit({
  id: true,         // Gerado via UUID no Use Case
  createdAt: true,  // Gerado por padrão no SQLite
  updatedAt: true,  // Gerado por padrão no SQLite
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;