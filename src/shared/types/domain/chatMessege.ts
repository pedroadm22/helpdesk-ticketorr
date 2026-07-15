export interface ChatMessage {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  createdAt: Date;
}