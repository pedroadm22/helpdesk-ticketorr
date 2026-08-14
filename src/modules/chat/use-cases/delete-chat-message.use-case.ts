// src/modules/chat/use-cases/delete-chat-message.use-case.ts
import { DeleteChatMessageDTO, deleteChatMessageSchema } from "../dtos/delete-message.dto";
import { IChatRepository } from "../repositories/chat-repository.interface";

export async function deleteChatMessageUseCase(
  rawInput: DeleteChatMessageDTO,
  chatRepository: IChatRepository
): Promise<{ success: boolean }> {
  const input = deleteChatMessageSchema.parse(rawInput);

  const message = await chatRepository.findById(input.messageId);

  if (!message) {
    throw new Error("Mensagem não encontrada.");
  }

  // Regra de Negócio: Apenas o próprio autor pode apagar a mensagem
  if (message.userId !== input.userId) {
    throw new Error("Você não tem permissão para apagar esta mensagem.");
  }

  await chatRepository.delete(input.messageId);

  return { success: true };
}