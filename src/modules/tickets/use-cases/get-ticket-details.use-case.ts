import { GetTicketDetailsDTO, getTicketDetailsSchema } from "../dtos/get-ticket-details.dto";
import { TicketResponseDTO } from "../dtos/ticket-response.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";

export function createGetTicketDetailsUseCase(
  ticketRepository: ITicketRepository
) {
  return async (dto: GetTicketDetailsDTO): Promise<TicketResponseDTO> => {
    // 1. Valida o ID de entrada via Zod
    const { id } = getTicketDetailsSchema.parse(dto);

    // 2. Busca o ticket no repositório com todas as relações populadas
    // (O findById do repositório já filtra por deletedAt IS NULL)
    const ticket = await ticketRepository.findById(id);

    // 3. Valida a existência e lança erro amigável se não for encontrado
    if (!ticket) {
      throw new Error("Chamado não encontrado ou foi inativado.");
    }

    return ticket;
  };
}