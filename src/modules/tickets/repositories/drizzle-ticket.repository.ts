import { eq, desc, and, SQL, isNull } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema";
import type {
  ITicketRepository,
  AssignTechnicianPayload,
  UpdateTicketStatusPayload,
  FindTicketsFilter,
} from "./ticket-repository.interface";
import type { CreateTicketDTO } from "../dtos/create-ticket.dto";
import type { TicketResponseDTO } from "../dtos/ticket-response.dto";
import type { TicketPriority } from "@/shared/types/domain/zod.types";

// 🎯 Configuração única das projeções/colunas dos JOINs.
// Garante que o retorno do Drizzle satisfaça a interface do TicketResponseDTO.
const defaultWith = {
  department: {
    columns: { id: true, name: true },
  },
  service: {
    columns: { id: true, name: true, defaultPriority: true },
  },
  client: {
    columns: { id: true, name: true, email: true, image: true, role: true },
  },
  assignedTo: {
    columns: { id: true, name: true, email: true, image: true, role: true },
  },
} as const;

export const drizzleTicketRepository: ITicketRepository = {

  softDelete: async (id: string): Promise<boolean> => {
    const [updated] = await db
      .update(tickets)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(tickets.id, id), isNull(tickets.deletedAt)))
      .returning({ id: tickets.id });

    return !!updated;
  },
  /**
   * Busca um ticket por ID populando Department, Service, Client e AssignedTo
   */
  findById: async (id: string): Promise<TicketResponseDTO | null> => {
    const result = await db.query.tickets.findFirst({
      where: (t, { eq }) => eq(t.id, id),
      with: defaultWith,
    });

    return (result as TicketResponseDTO) ?? null;
  },

  /**
   * Lista tickets ordenados por data de criação com suporte a filtros dinâmicos
   */
  findAll: async (filters?: FindTicketsFilter): Promise<TicketResponseDTO[]> => {
    const conditions: SQL[] = [];

    if (filters?.clientId) {
      conditions.push(eq(tickets.clientId, filters.clientId));
    }
    if (filters?.agentId) {
      conditions.push(eq(tickets.agentId, filters.agentId));
    }
    if (filters?.departmentId) {
      conditions.push(eq(tickets.departmentId, filters.departmentId));
    }
    if (filters?.status) {
      conditions.push(eq(tickets.status, filters.status));
    }
    if (filters?.priority) {
      conditions.push(eq(tickets.priority, filters.priority));
    }

    const results = await db.query.tickets.findMany({
      where: conditions.length > 0 ? and(...conditions) : undefined,
      orderBy: [desc(tickets.createdAt)],
      with: defaultWith,
    });

    return results as TicketResponseDTO[];
  },

  /**
   * Insere o ticket no banco e busca o registro populado completo
   */
  create: async (
    data: CreateTicketDTO & { priority: TicketPriority }
  ): Promise<TicketResponseDTO> => {
    const [inserted] = await db
      .insert(tickets)
      .values([
        {
          title: data.title,
          description: data.description,
          serviceId: data.serviceId,
          departmentId: data.departmentId,
          priority: data.priority,
          clientId: data.clientId,
          agentId: data.assignedToId ?? null,
        },
      ])
      .returning({ id: tickets.id });

    // Reutiliza o findById para trazer o objeto com todas as relações
    const ticket = await drizzleTicketRepository.findById(inserted.id);
    if (!ticket) {
      throw new Error("Erro de consistência ao carregar o ticket recém-criado.");
    }

    return ticket;
  },

  /**
   * Atribui um técnico e/ou atualiza o status do ticket
   */
  assignTechnician: async (
    payload: AssignTechnicianPayload
  ): Promise<TicketResponseDTO> => {
    await db
      .update(tickets)
      .set({
        agentId: payload.technicianId,
        ...(payload.status && { status: payload.status }),
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, payload.ticketId));

    const updatedTicket = await drizzleTicketRepository.findById(payload.ticketId);
    if (!updatedTicket) {
      throw new Error("Ticket não encontrado após reatribuição.");
    }

    return updatedTicket;
  },

  /**
   * Atualiza apenas o status do ticket
   */
  updateStatus: async (
    payload: UpdateTicketStatusPayload
  ): Promise<TicketResponseDTO> => {
    await db
      .update(tickets)
      .set({
        status: payload.status,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, payload.ticketId));

    const updatedTicket = await drizzleTicketRepository.findById(payload.ticketId);
    if (!updatedTicket) {
      throw new Error("Ticket não encontrado após alteração de status.");
    }

    return updatedTicket;
  },

  /**
   * Remove o ticket pelo ID
   */
  delete: async (id: string): Promise<boolean> => {
    const result = await db
      .delete(tickets)
      .where(eq(tickets.id, id))
      .returning({ id: tickets.id });

    return result.length > 0;
  },
};