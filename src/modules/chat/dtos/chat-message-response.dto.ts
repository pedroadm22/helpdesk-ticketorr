// src/modules/chat/dtos/chat-message-response.dto.ts
import { ChatMessageWithUser } from "@/shared/types/domain/db.type";

// Representação única e completa de uma mensagem no Chat (com dados do autor)
export type ChatMessageResponseDTO = ChatMessageWithUser;