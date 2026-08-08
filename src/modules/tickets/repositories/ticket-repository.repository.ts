import { Ticket } from '@/shared/domain/types/ticket.type';
import { TicketMessage } from '@/shared/domain/types/ticket-message.type';
import { TicketFilters } from '@/shared/domain/types/ticket-filters.type';
import { PaginatedOutput } from '@/shared/domain/types/pagination.type';

export type TicketRepository = Readonly<{
  // Operações de Chamado
  save: (ticket: Ticket) => Promise<Ticket>;
  update: (ticket: Ticket) => Promise<Ticket>;
  findById: (id: string) => Promise<Ticket | null>;
  findByCode: (code: string) => Promise<Ticket | null>;
  findMany: (filters: TicketFilters) => Promise<PaginatedOutput<Ticket>>;

  // Operações de Mensagens / Chat
  saveMessage: (message: TicketMessage) => Promise<TicketMessage>;
  findMessagesByTicketId: (ticketId: string) => Promise<ReadonlyArray<TicketMessage>>;
}>;