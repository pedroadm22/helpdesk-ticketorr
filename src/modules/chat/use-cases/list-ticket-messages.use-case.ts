import { eq, asc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { ListTicketMessagesInput, ListTicketMessagesSchema } from "../dto/list-ticket-messages.dto";

type ChatMessage = typeof chatMessages.$inferSelect;

export class ListTicketMessagesUseCase {
  async execute(input: ListTicketMessagesInput): Promise<ChatMessage[]> {
    // 1. Valida a entrada com o Zod
    const validatedData = ListTicketMessagesSchema.parse(input);

    // 2. Busca o ticket para validar a propriedade/segurança
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, validatedData.ticketId))
      .limit(1);

    if (!ticket) {
      throw new Error("Ticket não encontrado.");
    }

    // 🛡️ TRAVA DE SEGURANÇA: Se for um cliente, ele só pode ver as mensagens se o ticket for dele
    if (validatedData.requestedByUserRole === "user" && ticket.clientId !== validatedData.requestedByUserId) {
      throw new Error("Você não tem permissão para visualizar as mensagens deste chamado.");
    }

    // 3. Busca as mensagens ordenadas de forma cronológica crescente (antigas -> novas)
    const messages = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.ticketId, validatedData.ticketId))
      .orderBy(asc(chatMessages.createdAt)); // Garante a ordem correta da conversa

    return messages;
  }
}