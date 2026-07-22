import { chatMessages } from "@/infrastructure/db/schema/chat_messages"; // Ajuste para o caminho do seu schema de mensagens

// 🌟 Tipos exportados centralizados do Drizzle
export type ChatMessageEntity = typeof chatMessages.$inferSelect;
export type ChatMessageInsert = typeof chatMessages.$inferInsert;

// Tipo enriquecido para listar mensagens junto com nome/foto do remetente
export type ChatMessageWithSender = ChatMessageEntity & {
  sender?: {
    id: string;
    name: string;
    email: string;
  };
};

export interface IChatRepository {
  createMessage(data: ChatMessageInsert): Promise<ChatMessageEntity>;
  findById(id: string): Promise<ChatMessageEntity | null>;
  findByTicketId(ticketId: string): Promise<ChatMessageEntity[]>;
  findByTicketIdWithSender(ticketId: string): Promise<ChatMessageWithSender[]>;
  deleteMessage(id: string): Promise<boolean>;
}