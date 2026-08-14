// src/modules/tickets/strategies/ticket-assignment.strategy.ts

export type AssignmentContext = {
  ticketId: string;
  targetAgentId?: string | null;
};

// Em vez de 'interface ITicketAssignmentStrategy', usamos um tipo de função:
export type TicketAssignmentStrategyFn = (
  context: AssignmentContext
) => Promise<string | null>;