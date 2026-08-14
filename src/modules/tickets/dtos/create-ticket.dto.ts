import { Ticket } from "@/shared/domain/types/ticket.type";

export type CreateTicketDTO = Pick<Ticket, 'serviceId' | 'description' | 'clientId' | "priority">