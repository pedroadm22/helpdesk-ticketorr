// src/modules/tickets/dto/AddTicketMessageDto.ts
import { z } from "zod";

export const addTicketMessageSchema = z.object({
  ticketId: z.uuid({ message: "ID do ticket inválido." }),
  senderId: z.uuid({ message: "ID do remetente inválido." }),
  content: z.string().min(1, { message: "A mensagem não pode ser vazia." }),
});

export type AddTicketMessageInput = z.infer<typeof addTicketMessageSchema>;