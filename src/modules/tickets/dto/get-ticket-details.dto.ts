import { z } from "zod";

export const GetTicketDetailsSchema = z.object({
  ticketId: z.string().min(1, "ID do ticket é obrigatório"),
  viewerId: z.string().min(1, "ID do usuário visualizador é obrigatório"),
});

export type GetTicketDetailsInput = z.infer<typeof GetTicketDetailsSchema>;