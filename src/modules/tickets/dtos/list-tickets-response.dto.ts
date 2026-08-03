// src/modules/tickets/dtos/list-tickets-response.dto.ts
import { TicketResponseDTO } from "./ticket-response.dto";

export type ListTicketsResponseDTO = {
  data: TicketResponseDTO[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};