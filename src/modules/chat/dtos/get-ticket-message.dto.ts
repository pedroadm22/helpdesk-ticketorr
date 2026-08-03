// src/modules/chat/dtos/get-ticket-messages.dto.ts
import { z } from "zod";

export const getTicketMessagesSchema = z.object({
  ticketId: z.string().uuid("ID do ticket inválido"),
  includeInternal: z.boolean().optional().default(false),
});

export type GetTicketMessagesDTO = z.infer<typeof getTicketMessagesSchema>;