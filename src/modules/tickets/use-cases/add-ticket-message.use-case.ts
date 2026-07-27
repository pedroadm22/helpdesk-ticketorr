import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { users } from "@/infrastructure/db/schema/auth";
import { AddTicketMessageInput, AddTicketMessageSchema } from "../dto/add-ticket-message.dto";
import { ticketRepository, TicketMessageEntity } from "../repositories/ticket.repository";

export async function addTicketMessageUseCase(
  input: AddTicketMessageInput
): Promise<TicketMessageEntity> {
  // 1. Valida a entrada com Zod
  const validatedData = AddTicketMessageSchema.parse(input);

  // 2. Valida se o ticket existe e pode receber mensagens
  const [ticket] = await db
    .select()
    .from(tickets)
    .where(eq(tickets.id, validatedData.ticketId))
    .limit(1);

  if (!ticket) {
    throw new Error("Ticket não encontrado.");
  }

  if (ticket.status === "CLOSED") {
    throw new Error("Não é possível enviar mensagens em um chamado já finalizado.");
  }

  // 3. Busca o remetente para checar permissão/role
  const [sender] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, validatedData.senderId))
    .limit(1);

  if (!sender) {
    throw new Error("Remetente não encontrado.");
  }

  const now = new Date();

  // 4. Insere a mensagem e atualiza o status do ticket em uma transação
  const newMessage = await db.transaction(async (tx) => {
    // Adiciona a mensagem pelo histórico
    const message = await ticketRepository.addMessage({
      ticketId: validatedData.ticketId,
      userId: validatedData.senderId,
      content: validatedData.content,
    });

    // Regra de Negócio: Determinar o novo status do ticket baseado na role do remetente
    let newStatus: typeof tickets.$inferSelect.status | null = null;

    if (sender.role === "ADMIN" || sender.role === "TECHNICIAN") {
      newStatus = "WAITING_CLIENT";
    } else if (sender.role === "CLIENT") {
      newStatus = "WAITING_AGENT";
    }

    // Atualiza o status e updatedAt do ticket
    if (newStatus && ticket.status !== newStatus) {
      await tx
        .update(tickets)
        .set({
          status: newStatus,
          updatedAt: now,
        })
        .where(eq(tickets.id, validatedData.ticketId));
    }

    return message;
  });

  if (!newMessage) {
    throw new Error("Erro ao criar a mensagem no banco de dados.");
  }

  return newMessage;
}