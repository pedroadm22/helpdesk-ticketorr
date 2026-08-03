// src/modules/tickets/strategies/resolve-assignment-strategy.ts
import { TicketAssignmentStrategyFn } from "./ticket-assignment.strategy";
import { manualAssignmentStrategy } from "./manual-assignment.strategy";
import { createWorkloadAssignmentStrategy } from "./workload-assignment.strategy";
import { ITicketRepository } from "../repositories/ticket-repository.interface";
import { IUserRepository } from "@/modules/catalog/users/repositories/user-repository.interface";
import { AssignmentMode } from "@/shared/types/domain/zod.types";

export function resolveAssignmentStrategy(
  mode: AssignmentMode,
  ticketRepository: ITicketRepository,
  userRepository: IUserRepository
): TicketAssignmentStrategyFn {
  switch (mode) {
    case "MANUAL":
      return manualAssignmentStrategy;
    case "WORKLOAD_BALANCED":
      return createWorkloadAssignmentStrategy(ticketRepository, userRepository);
    default:
      throw new Error(`Modo de atribuição '${mode}' não suportado.`);
  }
}