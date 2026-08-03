// src/modules/tickets/strategies/manual-assignment.strategy.ts
import { TicketAssignmentStrategyFn } from "./ticket-assignment.strategy";

export const manualAssignmentStrategy: TicketAssignmentStrategyFn = async (context) => {
  return context.targetAgentId ?? null;
};