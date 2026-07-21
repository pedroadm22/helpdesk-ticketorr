import { z } from "zod";

export const ListTicketMessagesSchema = z.object({
  ticketId: z.string().uuid("ID do ticket inválido"),
  
  // 🔐 Segurança: Dados vindos do usuário autenticado na requisição
  requestedByUserId: z.string().min(1, "ID do usuário é obrigatório"),
  requestedByUserRole: z.enum(["admin", "technician", "user"]),
});

export type ListTicketMessagesInput = z.infer<typeof ListTicketMessagesSchema>;