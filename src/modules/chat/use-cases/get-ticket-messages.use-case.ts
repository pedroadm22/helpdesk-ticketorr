// src/modules/chat/use-cases/get-ticket-messages.use-case.ts
import { GetTicketMessagesDTO, getTicketMessagesSchema } from "../dtos/get-ticket-message.dto";
import { ChatMessageResponseDTO } from "../dtos/chat-message-response.dto";
import { IChatRepository } from "../repositories/chat-repository.interface";

export async function getTicketMessagesUseCase(
  ticketId: string,
  userRole: "CLIENT" | "TECHNICIAN" | "ADMIN",
  chatRepository: IChatRepository
): Promise<ChatMessageResponseDTO[]> {
  if (!ticketId) throw new Error("ID do ticket é obrigatório.");

  const includeInternal = userRole === "TECHNICIAN" || userRole === "ADMIN";

  return await chatRepository.findByTicketId(ticketId, includeInternal);
}