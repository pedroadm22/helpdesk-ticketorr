import { z } from "zod";
import { departmentBaseSchema } from "./department-base.schema";

export const departmentRespostaSchema = departmentBaseSchema.extend({
  id: z.string().uuid("ID inválido"),
  criadoEm: z.string(),
});

export type DepartmentRespostaDto = z.infer<typeof departmentRespostaSchema>;