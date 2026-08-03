import { z } from "zod";

export const getTicketDetailsSchema = z.object({
  id: z.uuid("ID do chamado inválido."),
});

export type GetTicketDetailsDTO = z.infer<typeof getTicketDetailsSchema>;