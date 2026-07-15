export interface TicketPriority {
  id: string;
  name: string; // Ex: "Low", "Medium", "High", "Urgent"
  description: string | null;
}