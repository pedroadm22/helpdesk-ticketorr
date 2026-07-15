import { createInsertSchema } from "drizzle-zod";
import { departments } from "@/infrastructure/db/schema/departments";
import { z } from "zod";

// 1. Criamos o schema de validação herdando as propriedades de inserção do Drizzle
export const createDepartmentSchema = createInsertSchema(departments, {
  name: (schema) => schema.min(3, { 
    message: "O nome do departamento deve ter pelo menos 3 caracteres." 
  }),
  description: (schema) => schema.max(255, { 
    message: "A descrição não pode passar de 255 caracteres." 
  }).optional(),
}).omit({
  id: true,         // Gerado dinamicamente via UUIDv4 no Use Case
  createdAt: true,  // Gerado por padrão no SQLite (unixepoch)
  updatedAt: true,  // Gerado por padrão no SQLite (unixepoch)
});

// 2. Exportamos o tipo TypeScript para blindar nossos Casos de Uso
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;