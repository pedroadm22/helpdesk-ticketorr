import { Ticket } from "@/shared/domain/types/ticket.type";

export type CreateTicketDTO = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;