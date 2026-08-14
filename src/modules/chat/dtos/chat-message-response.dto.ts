// src/modules/chat/dtos/chat-message-response.dto.ts
import { ChatMessage, User } from "@/shared/types/domain/db.type";

// 1. O usuário do seu schema já é 100% público e seguro!
// Selecionamos apenas os campos necessários para a UI da mensagem
export type PublicUserDTO = Omit<User, "createdAt" | "updataedAt">;

// 2. DTO de resposta limpo e direto
export type ChatMessageResponseDTO = ChatMessage & {
  user: PublicUserDTO;
};