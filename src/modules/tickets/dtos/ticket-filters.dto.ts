import { Ticket } from "@/shared/domain/types/ticket.type";

export type FilterTicketsDTO = Partial<Pick<Ticket, 'status' | 'priority' | 'clientId' | 'assignedAgentId' | 'serviceId'>> & {
  page?: number;
  limit?: number;
};