// src/actions/chat/send-message.action.ts
"use server";

import { sendChatMessageUseCase } from "@/modules/chat/use-cases/send-chat-message.use-case";
import { drizzleChatRepository } from "@/modules/chat/repositories/drizzle-chat.repository";
import { SendChatMessageDTO } from "@/modules/chat/dtos/send-message.dto";
import { ChatMessageResponseDTO } from "@/modules/chat/dtos/chat-message-response.dto";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function sendMessageAction(
  input: SendChatMessageDTO
): Promise<ActionResult<ChatMessageResponseDTO>> {
  try {
    const message = await sendChatMessageUseCase(input, drizzleChatRepository);
    return { success: true, data: message };
  } catch (error) {
    console.error("[sendMessageAction Error]:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao enviar a mensagem.";
    return { success: false, error: errorMessage };
  }
}