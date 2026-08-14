export const ALL_TICKET_PRIORITIES = [
  'LOW',
  'MEDIUM',
  'HIGH',
  'URGENT',
] as const;

export type TicketPriority = typeof ALL_TICKET_PRIORITIES[number];

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = Object.freeze({
  LOW: 'Baixa',
  MEDIUM: 'Média',
  HIGH: 'Alta',
  URGENT: 'Urgente',
});

export const TICKET_PRIORITY_SLA_HOURS: Record<TicketPriority, number> = Object.freeze({
  LOW: 48,      // 48 horas úteis
  MEDIUM: 24,   // 24 horas
  HIGH: 8,      // 8 horas
  URGENT: 2,    // 2 horas
});