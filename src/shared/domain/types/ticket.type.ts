import { TicketStatus } from './ticket-status.type';
import { TicketPriority } from './ticket-priority.type';

export type Ticket = Readonly<{
  id: string;
  code: string;
  title: string;
  description: string;
  serviceId: string;
  clientId: string;
  assignedAgentId: string | null;
  customCategory: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  slaDueDate: Date;
  resolvedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}>;