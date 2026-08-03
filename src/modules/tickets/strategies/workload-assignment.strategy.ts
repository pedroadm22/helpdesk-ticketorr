// src/modules/tickets/strategies/workload-assignment.strategy.ts
import { TicketAssignmentStrategyFn } from "./ticket-assignment.strategy";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { IUserRepository } from "@/modules/catalog/users/repositories/user-repository.interface";

// 🎯 HOF (Higher-Order Function): Recebe dependências e retorna a função Strategy
export function createWorkloadAssignmentStrategy(
  ticketRepository: ITicketRepository,
  userRepository: IUserRepository
): TicketAssignmentStrategyFn {
  return async (context) => {
    const ticket = await ticketRepository.findById(context.ticketId);
    if (!ticket) throw new Error("Ticket não encontrado para atribuição.");

    const agents = await userRepository.findAgentsByDepartment(ticket.departmentId);
    if (agents.length === 0) return null;

    let selectedAgentId: string | null = null;
    let minTicketCount = Infinity;

    for (const agent of agents) {
      const activeTickets = await ticketRepository.findAll({
        agentId: agent.id,
        status: "WAITING_AGENT",
      });

      if (activeTickets.length < minTicketCount) {
        minTicketCount = activeTickets.length;
        selectedAgentId = agent.id;
      }
    }

    return selectedAgentId;
  };
}