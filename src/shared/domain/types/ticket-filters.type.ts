import { TicketStatus, TicketPriority } from './ticket.type';

export type TicketFilters = Readonly<{
  searchQuery?: string;
  status?: TicketStatus | ReadonlyArray<TicketStatus>;
  priority?: TicketPriority;
  departmentId?: string;
  serviceId?: string;
  clientId?: string;
  assignedAgentId?: string;
  unassignedOnly?: boolean;
  isSlaBreached?: boolean;
  startDate?: Date;
  endDate?: Date;
}>;