// src/modules/tickets/use-cases/assign-ticket.use-case.ts
import { AssignTicketDTO, assignTicketSchema } from "../dtos/assign-ticket.dto";
import { TicketResponseDTO } from "../dtos/ticket-response.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { IUserRepository } from "@/modules/users/repositories/user-repository.interface";
import { resolveAssignmentStrategy } from "../strategies/assignment-strategy.factory";

// 🎯 Função pura que recebe as dependências e retorna a função executável do Use Case
export function createAssignTicketUseCase(
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

    // 4. Executa a estratégia de atribuição
    const resolvedAgentId = await strategyFn({
      ticketId,
      targetAgentId: technicianId,
    });

    // 5. Regra de Negócio para o próximo status
    const nextStatus =
      resolvedAgentId && ticket.status === "OPEN" ? "IN_PROGRESS" : undefined;

    // 6. Atualiza no repositório
    return await ticketRepository.assignTechnician({
      ticketId,
      technicianId: resolvedAgentId,
      status: nextStatus,
    });
  };
}