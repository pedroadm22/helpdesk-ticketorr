import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { user } from "@/infrastructure/db/schema/auth";
import { AssignTicketInput, AssignTicketSchema } from "../dto/assign-ticket.dto";

type Ticket = typeof tickets.$inferSelect;

export class AssignTicketUseCase {
  async execute(input: AssignTicketInput): Promise<Ticket> {
    const validatedData = AssignTicketSchema.parse(input);

    // 1. Valida se o agente de suporte existe e realmente é do suporte
    const [agent] = await db
      .select()
      .from(user)
      .where(eq(user.id, validatedData.agentId))
      .limit(1);

    if (!agent || (agent.role !== "admin" && agent.role !== "technician")) {
      throw new Error("O usuário informado não é um atendente de suporte válido.");
    }

    // 2. Atualiza o ticket atribuindo o novo agente
    const [updatedTicket] = await db
      .update(tickets)
      .set({
        agentId: validatedData.agentId,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, validatedData.ticketId))
      .returning();

    if (!updatedTicket) {
      throw new Error("Ticket não encontrado para atribuição.");
    }

    return updatedTicket;
  }
}