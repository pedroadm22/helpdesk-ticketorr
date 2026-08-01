// src/modules/tickets/use-cases/create-ticket.use-case.ts
import { CreateTicketDTO, createTicketSchema } from "../dtos/create-ticket.dto";
import { TicketResponseDTO } from "../dtos/ticket-response.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { IServiceRepository } from "@/modules/services/repositories/service-repository.interface";

export function createTicketUseCase(
  ticketRepository: ITicketRepository,
  serviceRepository: IServiceRepository
) {
  return async (dto: CreateTicketDTO): Promise<TicketResponseDTO> => {
    const validatedData = createTicketSchema.parse(dto);

    const service = await serviceRepository.findById(validatedData.serviceId);
    if (!service) {
      throw new Error("O serviço selecionado não existe ou foi desativado.");
    }

    return await ticketRepository.create({
      ...validatedData,
      priority: service.priority,
    });
  };
}