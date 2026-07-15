export interface TicketStatus {
  id: string;
  name: string; // Ex: "Awaiting Triage", "In Progress", "Resolved"
  description: string | null;
}
