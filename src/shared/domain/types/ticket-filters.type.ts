import { TicketStatus } from './ticket-status.type';
import { TicketPriority } from './ticket-priority.type';

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