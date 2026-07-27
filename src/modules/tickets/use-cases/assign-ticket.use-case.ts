// src/modules/tickets/use-cases/assign-ticket.use-case.ts
import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { AssignTicketInput } from "@/modules/tickets/dto/assign-ticket.dto";  


export async function assignTicketUseCase({ ticketId, agentId }: AssignTicketInput) {
  return await db
    .update(tickets)
    .set({
      agentId: agentId,
      // ⚠️ Garanta que NÃO há a linha: status: "IN_PROGRESS" aqui!
      // Mantenha apenas a atualização do updatedAt e agentId:
      updatedAt: new Date(),
    })
    .where(eq(tickets.id, ticketId));
}