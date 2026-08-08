export interface TicketMessage {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean; // Se true, visível apenas para AGENT e ADMIN
  createdAt: Date;
}