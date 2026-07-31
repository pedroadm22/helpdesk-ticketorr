// src/modules/chat/repositories/chat-repository.interface.ts
import { ChatMessage, NewChatMessage, ChatMessageWithUser } from "@/shared/types/domain/db.type";

export interface IChatRepository {
  /**
   * Persiste uma nova mensagem e já retorna ela com os dados do autor (User).
   */
  create(data: NewChatMessage): Promise<ChatMessageWithUser>;

  /**
   * Busca o histórico de mensagens de um ticket ordenado por data (com o autor User acoplado).
   */
  findByTicketId(
    ticketId: string,
    includeInternal?: boolean
  ): Promise<ChatMessageWithUser[]>;

  /**
   * Busca uma mensagem específica pelo ID.
   */
  findById(messageId: string): Promise<ChatMessage | null>;

  /**
   * Remove uma mensagem do banco de dados.
   */
  delete(messageId: string): Promise<void>;
}