import { and, eq, SQL } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { ListTicketsInput, ListTicketsSchema } from "../dto/list-tickets.dto";

type Ticket = typeof tickets.$inferSelect;

export class ListTicketsUseCase {
  async execute(input: ListTicketsInput): Promise<Ticket[]> {
    // 1. Valida os filtros e dados de permissão com o Zod
    const filters = ListTicketsSchema.parse(input);

    // 2. Cria o array de condições que alimentará o 'and()' do Drizzle
    const conditions: (SQL | undefined)[] = [];

    // 🛡️ REGRA DE SEGURANÇA: Se for cliente comum, força a busca apenas pelos dele
    if (filters.requestedByUserRole === "user") {
      conditions.push(eq(tickets.clientId, filters.requestedByUserId));
    } else {
      // Se for técnico/admin, ele pode opcionalmente filtrar por um agente específico
      if (filters.agentId) {
        conditions.push(eq(tickets.agentId, filters.agentId));
      }
    }

    // 🔍 Filtros dinâmicos opcionais (Funcionam para ambos os painéis)
    if (filters.status) {
      conditions.push(eq(tickets.status, filters.status));
    }

    if (filters.priority) {
      conditions.push(eq(tickets.priority, filters.priority));
    }

    // 3. Executa a query trazendo apenas as condições válidas
    const results = await db
      .select()
      .from(tickets)
      .where(and(...conditions))
      .orderBy(tickets.updatedAt); // Ordena pelas interações mais recentes

    return results;
  }
}