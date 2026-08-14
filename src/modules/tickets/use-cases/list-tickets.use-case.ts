// src/modules/tickets/use-cases/list-tickets.use-case.ts
import { drizzleTicketRepository } from "../repositories/drizzle-ticket-repository";
import type { ITicketRepository } from "../repositories/ticket-repository.interface";
import { 
  listTicketsFilterSchema, 
  type ListTicketsQueryDTO 
} from "../dtos/list-tickets-filters.dto";

export async function listTicketsUseCase(
  query: ListTicketsQueryDTO,
  ticketRepo: ITicketRepository = drizzleTicketRepository
) {
  // 🟢 O parse do Zod aplica os defaults ("ALL", page: 1, limit: 20)
  const parsedFilters = listTicketsFilterSchema.parse(query);

  const fullQuery = {
    ...parsedFilters,
    scope: query.scope,
  };

  return await ticketRepo.list(fullQuery);
}