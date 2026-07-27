import { eq, asc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages";
import { users } from "@/infrastructure/db/schema/auth";

export type ChatMessageEntity = typeof chatMessages.$inferSelect;
export type ChatMessageInsert = typeof chatMessages.$inferInsert;

export type ChatMessageWithSender = ChatMessageEntity & {
  sender?: {
    id: string;
    name: string | null;
    email: string;
  };
};

export const chatRepository = {
  async createMessage(data: ChatMessageInsert): Promise<ChatMessageEntity> {
    const [inserted] = await db
      .insert(chatMessages)
      .values(data)
      .returning();

    if (!inserted) {
      throw new Error("Erro ao salvar mensagem no histórico do chat.");
    }

    return inserted;
  },

  async findById(id: string): Promise<ChatMessageEntity | null> {
    const [message] = await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.id, id))
      .limit(1);

    return message || null;
  },

  async findByTicketId(ticketId: string): Promise<ChatMessageEntity[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(asc(chatMessages.createdAt));
  },

  async findByTicketIdWithSender(
    ticketId: string
  ): Promise<ChatMessageWithSender[]> {
    const rows = await db
      .select({
        message: chatMessages,
        sender: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(chatMessages)
      .leftJoin(users, eq(chatMessages.userId, users.id))
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(asc(chatMessages.createdAt));

    return rows.map((row) => ({
      ...row.message,
      sender: row.sender?.id ? row.sender : undefined,
    }));
  },

  async deleteMessage(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(chatMessages)
      .where(eq(chatMessages.id, id))
      .returning();

    return !!deleted;
  },
};