import { and, desc, eq, SQL } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { ListTicketsInput, ListTicketsSchema } from "../dto/list-tickets.dto";
import { TicketEntity } from "../repositories/ticket.repository";

export async function listTicketsUseCase(
  input: ListTicketsInput
): Promise<TicketEntity[]> {
  // 1. Valida os filtros e permissões com o Zod
  const filters = ListTicketsSchema.parse(input);

  // 2. Array dinâmico de condições para a cláusula where
  const conditions: (SQL | undefined)[] = [];

  // 🛡️ TRAVA DE SEGURANÇA: Se for cliente comum, força o filtro apenas pelos chamados dele
  if (filters.requestedByUserRole === "CLIENT") {
    conditions.push(eq(tickets.clientId, filters.requestedByUserId));
  } else {
    // Se for técnico/admin, pode opcionalmente filtrar por um agente específico
    if (filters.agentId) {
      conditions.push(eq(tickets.agentId, filters.agentId));
    }
  }

  // 🔍 Filtros dinâmicos opcionais
  if (filters.status) {
    conditions.push(eq(tickets.status, filters.status));
  }

  if (filters.priority) {
    conditions.push(eq(tickets.priority, filters.priority));
  }

  // 3. Executa a busca aplicando as condições e ordenando do mais recente para o mais antigo
  const results = await db
    .select()
    .from(tickets)
    .where(and(...conditions))
    .orderBy(desc(tickets.updatedAt));

  return results;
}