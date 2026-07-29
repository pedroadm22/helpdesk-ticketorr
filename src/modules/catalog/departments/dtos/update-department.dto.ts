import { z } from "zod";
import { departmentBaseSchema } from "./department-base.schema";

export const atualizarDepartmentSchema = departmentBaseSchema.partial().extend({
  id: z.string().uuid("ID inválido"),
});

export type AtualizarDepartmentDto = z.infer<typeof atualizarDepartmentSchema>;