import { db } from "@/infrastructure/db";
import { tickets, user } from "@/infrastructure/db/schema"; // Importa "user"
import { eq, and, notInArray, sql, asc } from "drizzle-orm";

export class AutoAssignTicketUseCase {
  async execute(ticketId: string): Promise<string> {
    const [leastBusyAgent] = await db
      .select({
        agentId: user.id, // Ajustado para user
        activeTicketsCount: sql<number>`cast(count(${tickets.id}) as integer)`,
      })
      .from(user) // Ajustado para user
      .leftJoin(
        tickets,
        and(
          eq(tickets.agentId, user.id),
          notInArray(tickets.status, ["RESOLVED", "CLOSED"])
        )
      )
      // 🌟 Filtra os usuários cuja permissão seja "TECHNICIAN" (ou "AGENT" se preferir)
      .where(eq(user.role, "TECHNICIAN")) 
      .groupBy(user.id)
      .orderBy(asc(sql`activeTicketsCount`))
      .limit(1);

    if (!leastBusyAgent) {
      throw new Error("Nenhum técnico disponível no sistema para distribuição automática.");
    }

    await db
      .update(tickets)
      .set({
        agentId: leastBusyAgent.agentId,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, ticketId));

    return leastBusyAgent.agentId;
  }
}