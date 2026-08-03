import { unstable_cache } from "next/cache";
import { and, desc, eq, SQL } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { ListTicketsInput, ListTicketsSchema } from "../dtos/get-tickets-filters.dto";

export async function listTicketsUseCase(input: ListTicketsInput) {
  const filters = ListTicketsSchema.parse(input);

  console.log("➡️ [1. INPUT FILTERS]:", filters);

  const conditions: (SQL | undefined)[] = [];

  if (filters.requestedByUserRole === "CLIENT") {
    conditions.push(eq(tickets.clientId, filters.requestedByUserId));
  } else if (filters.requestedByUserRole === "TECHNICIAN") {
    conditions.push(eq(tickets.agentId, filters.requestedByUserId));
  }
  // ADMIN não entra aqui (busca sem filtro de usuário)

  if (filters.status) conditions.push(eq(tickets.status, filters.status));
  if (filters.priority) conditions.push(eq(tickets.priority, filters.priority));

  const results = await db
    .select()
    .from(tickets)
    .where(and(...conditions))
    .orderBy(desc(tickets.updatedAt));

  console.log("⬅️ [2. BANCO RETORNOU]:", results.length, "chamados.");
  return results;
}
