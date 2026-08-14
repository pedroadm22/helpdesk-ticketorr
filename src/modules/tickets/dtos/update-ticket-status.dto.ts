import { Ticket } from "@/shared/domain/types/ticket.type";

export type UpdateTicketStatusDTO = Pick<Ticket, "id" | "status"> &
  Partial<Pick<Ticket, "assignedAgentId">> & {
    resolutionNote?: Ticket['description'];
  };
