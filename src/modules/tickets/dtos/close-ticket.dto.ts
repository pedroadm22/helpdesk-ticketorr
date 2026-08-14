import { z } from "zod";

// 🟢 Schema de validação para Inativação / Soft Delete de Ticket
export const deleteTicketSchema = z.object({
  id: z.string().uuid("ID do chamado inválido."),
});

// Inferência do tipo TypeScript para uso nos Use Cases e Actions
export type DeleteTicketDTO = z.infer<typeof deleteTicketSchema>;