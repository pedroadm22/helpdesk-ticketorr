// src/modules/chat/repositories/drizzle-chat.repository.ts
import { db } from "@/infrastructure/db";
import { chatMessages } from "@/infrastructure/db/schema";
import { IChatRepository } from "./chat-repository.interface";
import { ChatMessage, NewChatMessage, ChatMessageWithUser } from "@/shared/types/domain/db.type";
import { eq } from "drizzle-orm";

export const drizzleChatRepository: IChatRepository = {
  async create(data: NewChatMessage): Promise<ChatMessageWithUser> {
    // 1. Insere a mensagem no banco
    const [inserted] = await db.insert(chatMessages).values(data).returning();

    // 2. Busca a mensagem recém-criada já trazendo o relacionamento com 'user'
    const messageWithUser = await db.query.chatMessages.findFirst({
      where: eq(chatMessages.id, inserted.id),
      with: {
        user: true,
      },
    });

    if (!messageWithUser) {
      throw new Error("Erro ao carregar a mensagem recém-criada.");
    }

    return messageWithUser;
  },

  async findByTicketId(
    ticketId: string,
    includeInternal: boolean = false
  ): Promise<ChatMessageWithUser[]> {
    return await db.query.chatMessages.findMany({
      where: (fields, { eq, and }) =>
        includeInternal
          ? eq(fields.ticketId, ticketId)
          : and(eq(fields.ticketId, ticketId), eq(fields.isInternal, false)),
      with: {
        user: true, // Garante que o JOIN traga nome, e-mail e avatar do autor
      },
      orderBy: (fields, { asc }) => [asc(fields.createdAt)],
    });
  },

  async findById(messageId: string): Promise<ChatMessage | null> {
    const [message] = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.id, messageId));

    return message ?? null;
  },

  async delete(messageId: string): Promise<void> {
    await db.delete(chatMessages).where(eq(chatMessages.id, messageId));
  },
};