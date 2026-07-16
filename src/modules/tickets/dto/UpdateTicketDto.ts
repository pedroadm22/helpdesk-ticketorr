// src/modules/tickets/dto/UpdateTicketStatusDto.ts
import { z } from "zod";

export const updateTicketStatusSchema = z.object({
  ticketId: z.string().uuid({ message: "ID do ticket inválido." }),
  status: z.enum(["OPEN", "IN_PROGRESS", "PENDING", "RESOLVED", "CLOSED"]),
  userId: z.string().uuid({ message: "ID do usuário que está alterando é inválido." }), // Para registrar no histórico quem alterou
});

export type UpdateTicketStatusInput = z.infer<typeof updateTicketStatusSchema>;