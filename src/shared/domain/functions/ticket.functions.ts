import { Ticket } from '../types/ticket.type';
import { TicketStatus } from '../types/ticket-status.type';

/**
 * 1. MÁQUINA DE ESTADOS DO CHAMADO
 * Dicionário imutável que mapeia os status permitidos a partir do status atual.
 */
const ALLOWED_STATUS_TRANSITIONS: Record<TicketStatus, readonly TicketStatus[]> = {
  OPEN: ['WAITING_AGENT', 'CLOSED'],
  WAITING_AGENT: ['VIEWED', 'WAITING_CLIENT', 'RESOLVED', 'CLOSED'],
  VIEWED: ['WAITING_CLIENT', 'RESOLVED', 'WAITING_AGENT'],
  WAITING_CLIENT: ['WAITING_AGENT', 'RESOLVED'],
  RESOLVED: ['CLOSED', 'WAITING_AGENT'], // WAITING_AGENT representa reabertura pelo cliente
  CLOSED: [],                            // Estado final e terminal
};

/**
 * Valida se uma transição de status é permitida pelas regras de negócio.
 */
export const canTransitionStatus = (
  currentStatus: TicketStatus,
  targetStatus: TicketStatus
): boolean => {
  return ALLOWED_STATUS_TRANSITIONS[currentStatus]?.includes(targetStatus) ?? false;
};

/**
 * Verifica se o chamado pode ser encerrado/fechado.
 */
export const canCloseTicket = (ticket: Ticket): boolean => {
  return canTransitionStatus(ticket.status, 'CLOSED');
};

/**
 * Aplica a transição de status retornando uma NOVA instância imutável do Ticket.
 */
export const transitionTicketStatus = (
  ticket: Ticket,
  newStatus: TicketStatus,
  now = new Date()
): Ticket => {
  if (!canTransitionStatus(ticket.status, newStatus)) {
    throw new Error(
      `Transição de status inválida: Não é possível alterar de '${ticket.status}' para '${newStatus}'.`
    );
  }

  const isResolving = newStatus === 'RESOLVED';
  const isClosing = newStatus === 'CLOSED';

  return Object.freeze({
    ...ticket,
    status: newStatus,
    resolvedAt: isResolving ? now : ticket.resolvedAt,
    closedAt: isClosing ? now : ticket.closedAt,
    updatedAt: now,
  });
};

/**
 * 2. CÁLCULO DE SLA
 * Calcula a data e hora exatas de vencimento do SLA a partir de um prazo em horas.
 */
export const calculateSlaDueDate = (slaHours: number, baseDate = new Date()): Date => {
  const dueDate = new Date(baseDate.getTime());
  dueDate.setHours(dueDate.getHours() + slaHours);
  return dueDate;
};

/**
 * Valida se o SLA do chamado foi estourado em relação a uma data (por padrão, o momento atual).
 */
export const isSlaBreached = (slaDueDate: Date, now = new Date()): boolean => {
  return now.getTime() > slaDueDate.getTime();
};