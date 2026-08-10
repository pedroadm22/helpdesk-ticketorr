import { TicketFilters } from "@/shared/domain/types/ticket-filters.type";

export type FilterTicketsDTO = TicketFilters & {
  page?: number;
  limit?: number;
};