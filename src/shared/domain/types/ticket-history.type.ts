export type TicketHistoryAction =
  | "created"
  | "assigned"
  | "viewed"
  | "status_changed"
  | "priority_changed"
  | "message_added"
  | "reopened"
  | "closed"

  export interface TicketHistory {
  id: string;
  ticketId: string;
  actorId: string;
  action: TicketHistoryAction;
  createdAt: Date;
  metadata: Record<string, unknown> | null;
}