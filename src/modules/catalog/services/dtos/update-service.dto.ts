import { z } from "zod";

export const updateServiceSchema = z.object({
  id: z.string().uuid("ID do serviço inválido."),
  name: z.string().min(2, "O nome do serviço deve ter pelo menos 2 caracteres.").optional(),
  description: z.string().optional().nullable(),
  departmentId: z.string().uuid("ID de departamento inválido.").optional(),
  slaHours: z
    .number()
    .int()
    .positive("O tempo de SLA deve ser maior que zero.")
    .optional(),
  defaultPriority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateServiceDTO = z.infer<typeof updateServiceSchema>;