// src/modules/tickets/repositories/ticket-repository.interface.ts

// 🟢 1. Apenas IMPORTAMOS o que já existe no seu projeto!
import type { CreateTicketDTO } from "../dtos/create-ticket.dto";
import type { TicketResponseDTO } from "../dtos/ticket-response.dto";
import type { TicketStatus, TicketPriority } from "@/shared/types/domain/zod.types";

// Re-exportamos caso algum arquivo precise importar a partir da interface
export type { TicketResponseDTO };

// 🟢 2. Payloads específicos apenas de ações de repositório
export type AssignTechnicianPayload = {
  ticketId: string;
  technicianId: string | null;
  status?: TicketStatus;
};

export type UpdateTicketStatusPayload = {
  ticketId: string;
  status: TicketStatus;
};

export type FindTicketsFilter = {
  clientId?: string;
  agentId?: string;
  departmentId?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
};

// 🟢 3. O Contrato usa diretamente o TicketResponseDTO importado
export type ITicketRepository = {
  findById: (id: string) => Promise<TicketResponseDTO | null>;
  findAll: (filters?: FindTicketsFilter) => Promise<TicketResponseDTO[]>;
  softDelete: (id: string) => Promise<boolean>;
  create: (
    data: CreateTicketDTO & { priority: TicketPriority }
  ) => Promise<TicketResponseDTO>;
  assignTechnician: (
    payload: AssignTechnicianPayload
  ) => Promise<TicketResponseDTO>;
  updateStatus: (
    payload: UpdateTicketStatusPayload
  ) => Promise<TicketResponseDTO>;
  delete: (id: string) => Promise<boolean>;
};