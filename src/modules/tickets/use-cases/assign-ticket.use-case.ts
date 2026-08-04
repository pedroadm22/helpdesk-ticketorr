// src/modules/tickets/use-cases/assign-ticket.use-case.ts
import { AssignTicketDTO, assignTicketSchema } from "../dtos/assign-ticket.dto";
import { TicketResponseDTO } from "../dtos/ticket-response.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { IUserRepository } from "@/modules/catalog/users/repositories/user-repository.interface";
import { resolveAssignmentStrategy } from "../strategies/assignment-strategy.factory";

// 🎯 Função pura que recebe as dependências e retorna a função executável do Use Case
export function assignTicketUseCase(
  ticketRepository: ITicketRepository,
  userRepository: IUserRepository
) {
  return async (dto: AssignTicketDTO): Promise<TicketResponseDTO> => {
    // 1. Validação de Schema
    const { ticketId, technicianId, mode } = assignTicketSchema.parse(dto);

    // 2. Busca ticket
    const ticket = await ticketRepository.findById(ticketId);
    if (!ticket) throw new Error("Chamado não encontrado.");

    // 3. Resolve a estratégia funcional
    const strategyFn = resolveAssignmentStrategy(
      mode,
      ticketRepository,
      userRepository
    );

    const resolvedAgentId = await strategyFn({
      ticketId,
      targetAgentId: technicianId,
    });

    const nextStatus =
      resolvedAgentId && ticket.status === "OPEN" ? "WAITING_AGENT" : undefined;

    // 6. Atualiza no repositório
    return await ticketRepository.assignTechnician({
      ticketId,
      technicianId: resolvedAgentId,
      status: nextStatus,
    });
  };
}