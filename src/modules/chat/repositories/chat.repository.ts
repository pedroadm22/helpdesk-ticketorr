import { eq, asc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages";
import { user } from "@/infrastructure/db/schema/auth"; // Schema de usuários para o Join
import {
  IChatRepository,
  ChatMessageEntity,
  ChatMessageInsert,
  ChatMessageWithSender,
} from "./chat.repository.interface";

export class ChatRepository implements IChatRepository {
  async createMessage(data: ChatMessageInsert): Promise<ChatMessageEntity> {
    const [inserted] = await db
      .insert(chatMessages)
      .values(data)
      .returning();

    if (!inserted) {
      throw new Error("Erro ao salvar mensagem no histórico do chat.");
    }

    return inserted;
  }

  async findById(id: string): Promise<ChatMessageEntity | null> {
    const [message] = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.id, id));

    return message || null;
  }

  async findByTicketId(ticketId: string): Promise<ChatMessageEntity[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(asc(chatMessages.createdAt)); // Ordena do mais antigo para o mais recente (cronológico)
  }

  async findByTicketIdWithSender(
    ticketId: string
  ): Promise<ChatMessageWithSender[]> {
    const rows = await db
      .select({
        message: chatMessages,
        sender: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(chatMessages)
      .leftJoin(user, eq(chatMessages.senderId, user.id))
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(asc(chatMessages.createdAt));

    return rows.map((row) => ({
      ...row.message,
      sender: row.sender?.id ? row.sender : undefined,
    }));
  }

  async deleteMessage(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(chatMessages)
      .where(eq(chatMessages.id, id))
      .returning();

    return !!deleted;
  }
}