// src/actions/chat/get-ticket-messages.action.ts
"use server";

import { getTicketMessagesUseCase } from "@/modules/chat/use-cases/get-ticket-messages.use-case";
import { drizzleChatRepository } from "@/modules/chat/repositories/drizzle-chat.repository";
import { ChatMessageResponseDTO } from "@/modules/chat/dtos/chat-message-response.dto";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function getTicketMessagesAction(
  ticketId: string,
  userRole: "CLIENT" | "TECHNICIAN" | "ADMIN"
): Promise<ActionResult<ChatMessageResponseDTO[]>> {
  try {
    const messages = await getTicketMessagesUseCase(
      ticketId,
      userRole,
      drizzleChatRepository
    );
    return { success: true, data: messages };
  } catch (error) {
    console.error("[getTicketMessagesAction Error]:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao carregar mensagens do chat.";
    return { success: false, error: errorMessage };
  }
}