import { ticketRepository } from "@/modules/tickets/repositories/ticket.repository";
import { ListTicketMessagesInput, ListTicketMessagesSchema } from "../dto/list-ticket-messages.dto";
import { chatRepository, ChatMessageWithSender } from "../repositories/chat.repository";

export async function listTicketMessagesUseCase(
  input: ListTicketMessagesInput
): Promise<ChatMessageWithSender[]> {
  // 1. Valida a entrada com o Zod
  const validatedData = ListTicketMessagesSchema.parse(input);

  // 2. Busca o ticket para validar a propriedade/segurança
  const ticket = await ticketRepository.findById(validatedData.ticketId);

  if (!ticket) {
    throw new Error("Ticket não encontrado.");
  }

  // 🛡️ TRAVA DE SEGURANÇA: Se for um cliente, só visualiza se o chamado for dele
  if (
    validatedData.requestedByUserRole === "CLIENT" &&
    ticket.clientId !== validatedData.requestedByUserId
  ) {
    throw new Error("Você não tem permissão para visualizar as mensagens deste chamado.");
  }

  // 3. Busca as mensagens com os dados do remetente ordenadas cronologicamente
  const messages = await chatRepository.findByTicketIdWithSender(
    validatedData.ticketId
  );

  return messages;
}