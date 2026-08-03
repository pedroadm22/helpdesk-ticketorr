// src/modules/tickets/use-cases/list-tickets.use-case.ts
import {
  ListTicketsFilterDTO,
  listTicketsFilterSchema,
  ListTicketsQueryDTO,
} from "../dtos/list-tickets-filters.dto";
import { ListTicketsResponseDTO } from "../dtos/list-tickets-response.dto";
import { ITicketRepository } from "../repositories/ticket-repository.interface";

// 👈 Importamos o DTO do Usuário da Sessão (não o AuthResponseDTO)
import { SessionUserDTO } from "@/modules/auth/dtos/session-user.dto";

export function createListTicketsUseCase(ticketRepository: ITicketRepository) {
  return async (
    filters: ListTicketsFilterDTO,
    currentUser: SessionUserDTO // 👈 Agora recebemos o usuário extraído da sessão
  ): Promise<ListTicketsResponseDTO> => {
    const validatedFilters = listTicketsFilterSchema.parse(filters);

    const query: ListTicketsQueryDTO = {
      ...validatedFilters,
      scope: {
        userId: currentUser.id,   // ✅ Agora SIM: string UUID do usuário
        role: currentUser.role,   // ✅ Agora SIM: UserRole ("CLIENT" | "AGENT" | "ADMIN")
      },
    };

    const { tickets, total } = await ticketRepository.list(query);
    const totalPages = Math.ceil(total / validatedFilters.limit);

    return {
      data: tickets,
      meta: {
        total,
        page: validatedFilters.page,
        limit: validatedFilters.limit,
        totalPages,
      },
    };
  };
}