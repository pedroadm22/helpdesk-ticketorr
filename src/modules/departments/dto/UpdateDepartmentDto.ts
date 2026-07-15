import { createInsertSchema } from "drizzle-zod";
import { departments } from "@/infrastructure/db/schema/departments";
import { z } from "zod";

// 1. Criamos o schema com base na tabela
export const updateDepartmentSchema = createInsertSchema(departments, {
  id: (schema) =>
    schema.min(1, { message: "O ID do departamento é obrigatório." }),

  // Aplicamos diretamente as regras nos schemas do callback
  name: (schema) =>
    schema
      .min(3, {
        message:
          "Se informado, o nome do departamento deve ter pelo menos 3 caracteres.",
      })
      .optional(),

  description: (schema) =>
    schema
      .max(255, {
        message: "A descrição não pode passar de 255 caracteres.",
      })
      .optional(),
}).omit({
  createdAt: true,
  updatedAt: true,
});
