import { Ticket } from "@/shared/domain/types";

export type AssignTicketDTO = {
  ticketId: string;
  agentId: NonNullable<Ticket['assignedAgentId']>;
};