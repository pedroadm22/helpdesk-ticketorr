// src/modules/chat/use-cases/send-chat-message.use-case.ts
import { SendChatMessageDTO, sendChatMessageSchema } from "../dtos/send-message.dto";
import { ChatMessageResponseDTO } from "../dtos/chat-message-response.dto";
import { IChatRepository } from "../repositories/chat-repository.interface";

export async function sendChatMessageUseCase(
  rawInput: SendChatMessageDTO,
  chatRepository: IChatRepository
): Promise<ChatMessageResponseDTO> {
  const input = sendChatMessageSchema.parse(rawInput);

  return await chatRepository.create({
    ticketId: input.ticketId,
    userId: input.userId,
    content: input.content.trim(),
    isInternal: input.isInternal ?? false,
    attachments: input.attachments ?? null,
  });
}