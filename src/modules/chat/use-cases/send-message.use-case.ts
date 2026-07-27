import { chatRepository } from "../repositories/chat.repository";
import { EnviarMensagemInput } from "../dto/message.dto";

export async function enviarMensagemUseCase(data: EnviarMensagemInput) {
  if (!data.conteudo.trim()) {
    throw new Error("O conteúdo da mensagem é inválido.");
  }

  const savedMessage = await chatRepository.saveMessage({
    ticketId: data.ticketId,
    remetenteId: data.userId, // Repassando o userId recebido do DTO
    conteudo: data.conteudo,
  });

  return {
    id: savedMessage.id,
    conteudo: savedMessage.content,
    criadoEm: savedMessage.createdAt,
  };
}