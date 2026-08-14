// src/modules/chat/dtos/delete-chat-message.dto.ts
import { z } from "zod";

export const deleteChatMessageSchema = z.object({
  messageId: z.string().uuid("ID da mensagem inválido"),
  userId: z.string().uuid("ID do usuário solicitante inválido"),
});

export type DeleteChatMessageDTO = z.infer<typeof deleteChatMessageSchema>;