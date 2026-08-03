// src/modules/tickets/dtos/update-ticket-status.dto.ts
import { z } from "zod";
import { ticketStatusZodSchema } from "@/shared/types/domain/zod.types";

export const updateTicketStatusSchema = z.object({
  ticketId: z.uuid("ID do ticket inválido."),
  status: ticketStatusZodSchema,
  assignedToId: z.uuid("ID do técnico inválido.").nullable().optional(),
});

export type UpdateTicketStatusDTO = z.infer<typeof updateTicketStatusSchema>;