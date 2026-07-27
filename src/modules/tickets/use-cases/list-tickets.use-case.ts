import { and, desc, eq, isNull, SQL } from "drizzle-orm";
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

  // 🛡️ REGRAS DE VISIBILIDADE POR ROLE
  if (filters.requestedByUserRole === "CLIENT") {
    // 👤 Cliente: Vê estritamente os chamados abertos por ele
    conditions.push(eq(tickets.clientId, filters.requestedByUserId));
  } else if (filters.requestedByUserRole === "TECHNICIAN") {
    // 🛠️ Técnico: Vê apenas os chamados atribuídos a ele
    conditions.push(eq(tickets.agentId, filters.requestedByUserId));
  } else if (filters.requestedByUserRole === "ADMIN") {
    // 👑 Admin: Pode listar tudo ou aplicar filtros específicos
    if (filters.agentId) {
      // Ex: Admin quer filtrar o painel por um técnico específico
      conditions.push(eq(tickets.agentId, filters.agentId));
    }

    // Opcional: Se o Admin passar uma flag tipo `onlyUnassigned`, podemos filtrar por sem técnico
    // if (filters.unassignedOnly) {
    //   conditions.push(isNull(tickets.agentId));
    // }
  }

  // 🔍 Filtros dinâmicos adicionais
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