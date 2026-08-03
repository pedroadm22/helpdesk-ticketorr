import { z } from "zod";

export const departmentBaseSchema = z.object({
  name: z
    .string({ error: "O nome do departamento é obrigatório" })
    .min(2, "O nome deve ter no mínimo 2 caracteres"),
  description: z.string().optional(),
});

export type DepartmentBaseDto = z.infer<typeof departmentBaseSchema>;