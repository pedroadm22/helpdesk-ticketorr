import { Ticket } from "@/shared/domain/types";

export type AssignTicketDTO = {
  id: Ticket['id'];
  assignedAgentId: NonNullable<Ticket['assignedAgentId']>;
};