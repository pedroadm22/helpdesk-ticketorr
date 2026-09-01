export interface TicketMessage {
  id: string;

  ticketId: string;
  authorId: string;

  content: string;

  createdAt: Date;
  updatedAt: Date;
}