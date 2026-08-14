// src/actions/chat/delete-message.action.ts
"use server";

import { deleteChatMessageUseCase } from "@/modules/chat/use-cases/delete-chat-message.use-case";
import { drizzleChatRepository } from "@/modules/chat/repositories/drizzle-chat.repository";
import { DeleteChatMessageDTO } from "@/modules/chat/dtos/delete-message.dto";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function deleteChatMessageAction(
  input: DeleteChatMessageDTO
): Promise<ActionResult<{ success: boolean }>> {
  try {
    const result = await deleteChatMessageUseCase(input, drizzleChatRepository);
    return { success: true, data: result };
  } catch (error) {
    console.error("Erro em deleteChatMessageAction:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao deletar mensagem.";
    return { success: false, error: errorMessage };
  }
}