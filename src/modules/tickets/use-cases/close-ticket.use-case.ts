import { CloseTicketInput, CloseTicketSchema } from "../dto/close-ticket.dto";
import { ticketRepository, TicketEntity } from "../repositories/ticket.repository";

export async function closeTicketUseCase(
  input: CloseTicketInput
): Promise<TicketEntity> {
  // 1. Valida a entrada com o Zod
  const validatedData = CloseTicketSchema.parse(input);

  // 2. Executa a atualização do status para "CLOSED" via repositório
  const closedTicket = await ticketRepository.update(validatedData.ticketId, {
    status: "CLOSED",
  });

  if (!closedTicket) {
    throw new Error("Ticket não encontrado para encerramento.");
  }

  return closedTicket;
}