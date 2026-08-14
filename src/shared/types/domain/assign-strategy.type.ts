// src/modules/tickets/types/assign-strategy.type.ts

export type AssignStrategyPayload = {
  ticketId: string;
  departmentId: string;
  requestedByUserId: string; // Quem está disparando a ação
  explicitTechnicianId?: string | null; // ID enviado se for manual
};

/**
 * Função pura que decide qual técnico assumirá o ticket.
 * Retorna o ID do técnico selecionado ou null/erro.
 */
export type AssignStrategyFn = (
  payload: AssignStrategyPayload
) => Promise<string | null>;