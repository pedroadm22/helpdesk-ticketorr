import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema/auth";
import { AssignTicketInput, AssignTicketSchema } from "../dto/assign-ticket.dto";
import { ticketRepository, TicketEntity } from "../repositories/ticket.repository";

export async function assignTicketUseCase(
  input: AssignTicketInput
): Promise<TicketEntity> {
  const validatedData = AssignTicketSchema.parse(input);

  // 1. Valida se o agente de suporte existe e possui role válida (ADMIN ou TECHNICIAN)
  const [agent] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, validatedData.agentId))
    .limit(1);

  if (!agent || (agent.role !== "ADMIN" && agent.role !== "TECHNICIAN")) {
    throw new Error("O usuário informado não é um atendente de suporte válido.");
  }

  // 2. Atualiza o ticket atribuindo o novo agente através do repositório funcional
  const updatedTicket = await ticketRepository.update(validatedData.ticketId, {
    agentId: validatedData.agentId,
  });

  if (!updatedTicket) {
    throw new Error("Ticket não encontrado para atribuição.");
  }

  return updatedTicket;
}