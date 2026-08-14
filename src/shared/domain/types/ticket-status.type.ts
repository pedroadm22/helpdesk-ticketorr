// 📄 src/core/domain/types/ticket-status.type.ts

// 1. Array constante de valores (Fonte da Verdade)
export const ALL_TICKET_STATUSES = [
  'OPEN',
  'WAITING_AGENT',
  'VIEWED',
  'WAITING_CLIENT',
  'RESOLVED',
  'CLOSED',
] as const;

// 2. O Tipo derivado da união do próprio Array (Totalmente dinâmico!)
export type TicketStatus = typeof ALL_TICKET_STATUSES[number];

// 3. Rótulos amigáveis para a UI / Frontend
export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = Object.freeze({
  OPEN: 'Aberto',
  WAITING_AGENT: 'Aguardando Atendente',
  VIEWED: 'Em Visualização',
  WAITING_CLIENT: 'Aguardando Cliente',
  RESOLVED: 'Resolvido',
  CLOSED: 'Encerrado',
});