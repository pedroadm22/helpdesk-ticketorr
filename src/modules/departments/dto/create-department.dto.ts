import { createInsertSchema } from "drizzle-zod";
import { departments } from "@/infrastructure/db/schema/departments";
import { z } from "zod";

// 1. Criamos o schema de validação baseado na tabela de departamentos do banco
export const createDepartmentSchema = createInsertSchema(departments, {
  name: (schema) => schema.min(3, { 
    message: "O nome do setor deve ter pelo menos 3 caracteres." 
  }),
  description: (schema) => schema.optional(),
}).omit({
  id: true,         
  createdAt: true, 
  updatedAt: true, 
});

// 🌟 Aqui criamos o Tipo TypeScript definitivo que é exportado
export type CreateDepartmentInput = z.infer<typeof createDepartmentSchema>;