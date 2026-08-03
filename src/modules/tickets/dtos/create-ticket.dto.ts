import { ticketPriorityZodSchema } from "@/shared/types/domain/zod.types";
import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve ter no mínimo 3 caracteres.")
    .max(120, "O título deve ter no máximo 120 caracteres."),
  description: z
    .string()
    .trim()
    .min(10, "A descrição deve ter no mínimo 10 caracteres."),
  departmentId: z.uuid("Selecione um departamento válido."),
  clientId: z.uuid("ID do cliente inválido."),
  serviceId: z.uuid("ID do serviço inválido."),
  // Opcional na criação (pode vir nulo para atribuição posterior)
  assignedToId: z
    .uuid("ID do técnico inválido.")
    .nullable()
    .optional(),
});

export type CreateTicketDTO = z.infer<typeof createTicketSchema>;
