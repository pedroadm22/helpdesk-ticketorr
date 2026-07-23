import { z } from "zod";

export const CreateTicketSchema = z.object({
  title: z.string().min(5, "O título deve ter pelo menos 5 caracteres"),
  description: z.string().min(10, "Forneça uma descrição mais detalhada"),
  departmentId: z.string().min(1, "O departamento é obrigatório"),
  serviceId: z.string().min(1, "O serviço é obrigatório"),
  clientId: z.string().min(1, "O cliente é obrigatório"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;