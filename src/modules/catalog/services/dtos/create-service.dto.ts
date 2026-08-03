import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(2, "O nome do serviço deve ter pelo menos 2 caracteres."),
  description: z.string().optional().nullable(),
  departmentId: z.uuid("ID de departamento inválido."),
  slaHours: z
    .number({ message: "O SLA deve ser um número." }) 
    .int("O SLA deve ser um número inteiro de horas.")
    .positive("O tempo de SLA deve ser maior que zero.")
    .default(24),
  servicePriority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  isActive: z.boolean().default(true),
});

export type CreateServiceDTO = z.infer<typeof createServiceSchema>;