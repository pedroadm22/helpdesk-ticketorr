export interface Ticket {
  id: string;

  title: string;
  description: string;

  requesterId: string;

  departmentId: string;
  serviceId: string;

  assignedToId: string | null;

  teamId: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: Date;
  updatedAt: Date;
  closedAt: Date | null;
}

export type TicketStatus =
  | "opened"
  | "waiting_agent"
  | "viewed"
  | "waiting_client"
  | "closed";

export type TicketPriority =
  | "low"
  | "medium"
  | "high"
  | "critical";