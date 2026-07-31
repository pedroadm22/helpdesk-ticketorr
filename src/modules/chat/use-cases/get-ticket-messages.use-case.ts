// src/modules/chat/use-cases/get-ticket-messages.use-case.ts
import { GetTicketMessagesDTO, getTicketMessagesSchema } from "../dtos/get-ticket-message.dto";
import { ChatMessageResponseDTO } from "../dtos/chat-message-response.dto";
import { IChatRepository } from "../repositories/chat-repository.interface";

export async function getTicketMessagesUseCase(
  rawInput: GetTicketMessagesDTO,
  chatRepository: IChatRepository
): Promise<ChatMessageResponseDTO[]> {
  const input = getTicketMessagesSchema.parse(rawInput);

  return await chatRepository.findByTicketId(
    input.ticketId,
    input.includeInternal
  );
}