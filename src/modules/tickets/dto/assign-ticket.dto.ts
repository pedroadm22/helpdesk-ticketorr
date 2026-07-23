import { z } from "zod";

export const AssignTicketSchema = z.object({
  ticketId: z.string().min(1, { 
    message: "O ID do chamado é obrigatório." 
  }),
  agentId: z.string().min(1, { 
    message: "O ID do técnico a ser atribuído é obrigatório." 
  }), 
});

export type AssignTicketInput = z.infer<typeof AssignTicketSchema>;