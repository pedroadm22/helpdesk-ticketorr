import { createInsertSchema } from "drizzle-zod";
import { services } from "@/infrastructure/db/schema/services";
import { z } from "zod";

export const updateServiceSchema = createInsertSchema(services, {
  // O ID do serviço que queremos atualizar é obrigatório
  id: (schema) => schema.min(1, { message: "O ID do serviço é obrigatório." }),
  
  name: (schema) => schema.min(3, { 
    message: "Se informado, o nome do serviço deve ter pelo menos 3 caracteres." 
  }).optional(),
  
  description: (schema) => schema.max(255, { 
    message: "A descrição não pode passar de 255 caracteres." 
  }).optional(),
  
  departmentId: (schema) => schema.optional(), // Permite mover o serviço de departamento se necessário
}).omit({
  createdAt: true,
  updatedAt: true, // Será gerenciado na persistência ou aplicação
});

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;