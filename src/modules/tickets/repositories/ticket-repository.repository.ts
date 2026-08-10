import { Ticket } from "@/shared/domain/types/ticket.type";
import {
  UpdateTicketStatusDTO,
  AssignTicketDTO,
  FilterTicketsDTO,
  TicketDetailsResponseDTO,
} from "../dtos";

export interface ITicketRepository {
  findById(id: UpdateTicketStatusDTO["id"]): Promise<Ticket | null>;
  findDetailsById(
    id: UpdateTicketStatusDTO["id"],
  ): Promise<TicketDetailsResponseDTO | null>;

  findMany(filters?: FilterTicketsDTO): Promise<Ticket[]>;

  create(
    data: Omit<
      Ticket,
      "id" | "code" | "createdAt" | "updatedAt" | "resolvedAt" | "closedAt"
    >,
  ): Promise<Ticket>;

  // Passa o DTO diretamente como payload da operação
  updateStatus(data: UpdateTicketStatusDTO): Promise<Ticket>;
  assignToAgent(data: AssignTicketDTO): Promise<Ticket>;
}
