import { z } from "zod";

export const ListTicketsSchema = z.object({
  // 🔐 Dados do usuário logado (injetados pelo seu Middleware/Controller)
  requestedByUserId: z.string().min(1, "ID do usuário solicitante é obrigatório"),
  requestedByUserRole: z.enum(["ADMIN", "TECHNICIAN", "CLIENT"]),

  // 🔍 Filtros opcionais de busca
  status: z.enum(["WAITING_SUPPORT", "VIEWED", "WAITING_CLIENT", "WAITING_AGENT", "CLOSED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  agentId: z.string().optional(),
});

export type ListTicketsInput = z.infer<typeof ListTicketsSchema>;