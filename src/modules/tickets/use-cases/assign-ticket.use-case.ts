// src/modules/tickets/use-cases/assign-ticket.use-case.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";

export async function assignTicketUseCase({
  ticketId,
  agentId,
}: {
  ticketId: string;
  agentId: string;
}) {
  return await db
    .update(tickets)
    .set({
      agentId: agentId,
      status: "WAITING_AGENT", // Opcional: Atualiza o status automaticamente ao atribuir
      updatedAt: new Date(),
    })
    .where(eq(tickets.id, ticketId));
}