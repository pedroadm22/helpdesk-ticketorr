import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { user } from "@/infrastructure/db/schema/auth";
import { AddTicketMessageInput, AddTicketMessageSchema } from "../dto/add-ticket-message.dto";
import { randomUUID } from "crypto";

// 🌟 Inferindo o tipo de retorno diretamente da tabela do Drizzle
type ChatMessage = typeof chatMessages.$inferSelect;

export class AddTicketMessageUseCase {
  async execute(input: AddTicketMessageInput): Promise<ChatMessage> {
    // 1. Valida a entrada em runtime com o Zod
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
      .select()
      .from(user)
      .where(eq(user.id, validatedData.senderId))
      .limit(1);

    if (!sender) {
      throw new Error("Remetente não encontrado.");
    }

    const messageId = randomUUID();
    const now = new Date();

    // 4. Insere a mensagem e atualiza o status do ticket em uma transação
    const result = await db.transaction(async (tx) => {
      const [newMessage] = await tx
        .insert(chatMessages)
        .values({
          id: messageId,
          ticketId: validatedData.ticketId,
          senderId: validatedData.senderId,
          // 🌟 Mude de validatedData.message para validatedData.content:
          message: validatedData.content, 
          createdAt: new Date(),
        })
        .returning();

      // Regra de Negócio: Determinar o novo status do ticket
      let newStatus: typeof tickets.$inferSelect.status | null = null;

      if (sender.role === "admin" || sender.role === "technician") {
        newStatus = "WAITING_CLIENT";
      } else if (sender.role === "user") {
        newStatus = "WAITING_AGENT";
      }

      // Atualiza o ticket principal caso mude o status
      if (newStatus && ticket.status !== newStatus) {
        await tx
          .update(tickets)
          .set({
            status: newStatus,
            updatedAt: now,
          })
          .where(eq(tickets.id, validatedData.ticketId));
      }

      return newMessage;
    });

    if (!result) {
      throw new Error("Erro ao criar a mensagem no banco de dados.");
    }

    // 5. Retorna o registro inserido mapeado pelo Drizzle
    return result;
  }
}