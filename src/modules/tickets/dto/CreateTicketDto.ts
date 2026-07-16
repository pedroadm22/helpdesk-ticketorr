// src/modules/tickets/dto/CreateTicketDto.ts
import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(5, { 
    message: "O título do chamado deve ter pelo menos 5 caracteres." 
  }),
  description: z.string().min(10, { 
    message: "Por favor, descreva o problema com pelo menos 10 caracteres." 
  }),
  departmentId: z.string().uuid({ message: "Departamento inválido." }),
  serviceId: z.string().uuid({ message: "Serviço inválido." }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;