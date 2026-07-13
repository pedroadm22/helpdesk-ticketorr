// src/modules/tickets/dtos/encaminhar-ticket.dto.ts
import { z } from "zod";

export const encaminharTicketSchema = z.object({
  ticketId: z
    .string()
    .min(1, { message: "O ID do ticket é obrigatório." }),
  
  tecnicoId: z
    .string()
    .min(1, { message: "Você deve selecionar um técnico responsável." }),
  
  adminId: z
    .string()
    .min(1, { message: "O ID do administrador responsável pela triagem é obrigatório." }),
});

export type EncaminharTicketDTO = z.infer<typeof encaminharTicketSchema>;