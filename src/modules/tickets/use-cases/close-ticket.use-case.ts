// src/modules/tickets/use-cases/soft-delete-ticket.use-case.ts
import { DeleteTicketDTO, deleteTicketSchema } from "../dtos/close-ticket.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";

export function softDeleteTicketUseCase(
  ticketRepository: ITicketRepository
) {
  return async (dto: DeleteTicketDTO): Promise<boolean> => {
    // 1. Valida o payload de entrada
    const { id } = deleteTicketSchema.parse(dto);

    // 2. Garante que o ticket existe e não está inativo
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new Error("Chamado não encontrado ou já se encontra inativo.");
    }

    // 3. Executa o Soft Delete no Drizzle
    return await ticketRepository.softDelete(id);
  };
}