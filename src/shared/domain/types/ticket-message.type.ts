// 1. Tipagem isolada do anexo
export type TicketMessageAttachment = {
  id: string;
  filename: string;
  url: string;
}

// 2. Interface principal reutilizando o tipo do anexo
export type TicketMessage = {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  isInternal: boolean; // Se true, visível apenas para AGENT e ADMIN
  createdAt: Date;
  attachments?: ReadonlyArray<TicketMessageAttachment>;
}