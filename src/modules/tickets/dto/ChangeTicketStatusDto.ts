import { z } from "zod";

export const changeTicketStatusSchema = z.object({
  ticketId: z.string().min(1, { 
    message: "O ID do chamado é obrigatório." 
  }),
  statusId: z.string().min(1, { 
    message: "O ID do novo status é obrigatório." 
  }),
});

export type ChangeTicketStatusInput = z.infer<typeof changeTicketStatusSchema>;