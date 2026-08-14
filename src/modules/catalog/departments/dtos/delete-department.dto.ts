import { z } from "zod";

export const deletarDepartmentSchema = z.object({
  id: z.string().uuid("ID de departamento inválido"),
});

export type DeletarDepartmentDto = z.infer<typeof deletarDepartmentSchema>;