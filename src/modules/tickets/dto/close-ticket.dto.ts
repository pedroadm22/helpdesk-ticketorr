import { z } from "zod";

// 🌟 Validador em PascalCase
export const CloseTicketSchema = z.object({
  ticketId: z.uuid("ID do ticket inválido"),
});

// 🌟 Tipo de entrada gerado automaticamente pelo Zod
export type CloseTicketInput = z.infer<typeof CloseTicketSchema>;