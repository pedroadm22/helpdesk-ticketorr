// src/modules/chat/repositories/chat-repository.interface.ts
import { ChatMessage, NewChatMessage, ChatMessageWithUser } from "@/shared/types/domain/db.type";

export interface IChatRepository {
  create(data: NewChatMessage): Promise<ChatMessageWithUser>;
  findByTicketId(
    ticketId: string,
    includeInternal?: boolean
  ): Promise<ChatMessageWithUser[]>;

  findById(messageId: string): Promise<ChatMessage | null>;
  delete(messageId: string): Promise<void>;
}