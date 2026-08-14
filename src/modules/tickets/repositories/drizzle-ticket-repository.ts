import {
  eq,
  desc,
  and,
  SQL,
  isNull,
  ilike,
  or,
  isNotNull,
  count,
} from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "@/infrastructure/db";
import {
  departments,
  services,
  tickets,
  users,
} from "@/infrastructure/db/schema";
import type {
  ITicketRepository,
  AssignTechnicianPayload,
  UpdateTicketStatusPayload,
  FindTicketsFilter,
} from "./ticket-repository.interface";
import type { CreateTicketDTO } from "../dtos/create-ticket.dto";
import type { TicketResponseDTO } from "../dtos/ticket-response.dto";
import type { TicketPriority } from "@/shared/types/domain/zod.types";
import { ListTicketsQueryDTO } from "../dtos/list-tickets-filters.dto";

const clientUser = alias(users, "clientUser");
const agentUser = alias(users, "agentUser");

// 🎯 Configuração única das projeções/colunas dos JOINs.
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
  findAll: async (
    filters?: FindTicketsFilter,
  ): Promise<TicketResponseDTO[]> => {
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
    data: CreateTicketDTO & { priority: TicketPriority },
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

    const ticket = await drizzleTicketRepository.findById(inserted.id);
    if (!ticket) {
      throw new Error(
        "Erro de consistência ao carregar o ticket recém-criado.",
      );
    }

    return ticket;
  },

  /**
   * Atribui um técnico e/ou atualiza o status do ticket
   */
  assignTechnician: async (
    payload: AssignTechnicianPayload,
  ): Promise<TicketResponseDTO> => {
    await db
      .update(tickets)
      .set({
        agentId: payload.technicianId,
        ...(payload.status && { status: payload.status }),
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, payload.ticketId));

    const updatedTicket = await drizzleTicketRepository.findById(
      payload.ticketId,
    );
    if (!updatedTicket) {
      throw new Error("Ticket não encontrado após reatribuição.");
    }

    return updatedTicket;
  },

  /**
   * Atualiza apenas o status do ticket
   */
  updateStatus: async (
    payload: UpdateTicketStatusPayload,
  ): Promise<TicketResponseDTO> => {
    await db
      .update(tickets)
      .set({
        status: payload.status,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, payload.ticketId));

    const updatedTicket = await drizzleTicketRepository.findById(
      payload.ticketId,
    );
    if (!updatedTicket) {
      throw new Error("Ticket não encontrado após alteração de status.");
    }

    return updatedTicket;
  },
  delete: async (id: string): Promise<boolean> => {
    const result = await db
      .delete(tickets)
      .where(eq(tickets.id, id))
      .returning({ id: tickets.id });

    return result.length > 0;
  },

  /**
   * Lista tickets com paginação, filtros e controle de acesso (scope)
   */
  list: async (
    query: ListTicketsQueryDTO,
  ): Promise<{ tickets: TicketResponseDTO[]; total: number }> => {
    const whereClause = buildListTicketsWhereClause(query);
    const offset = (query.page - 1) * query.limit;

    const [rawTickets, [{ totalCount }]] = await Promise.all([
      db
        .select({
          ticket: tickets,
          department: {
            id: departments.id,
            name: departments.name,
          },
          service: {
            id: services.id,
            name: services.name,
            servicePriority: services.servicePriority, // 🟢 Bate com o DTO!
          },
          client: {
            id: clientUser.id,
            name: clientUser.name,
            email: clientUser.email,
            image: clientUser.image,
            role: clientUser.role,
          },
          assignedTo: {
            id: agentUser.id,
            name: agentUser.name,
            email: agentUser.email,
            image: agentUser.image,
            role: agentUser.role,
          },
        })
        .from(tickets)
        .innerJoin(departments, eq(tickets.departmentId, departments.id))
        .innerJoin(services, eq(tickets.serviceId, services.id))
        .innerJoin(clientUser, eq(tickets.clientId, clientUser.id))
        .leftJoin(agentUser, eq(tickets.agentId, agentUser.id))
        .where(whereClause)
        .limit(query.limit)
        .offset(offset)
        .orderBy(desc(tickets.createdAt)),

      db.select({ totalCount: count() }).from(tickets).where(whereClause),
    ]);

    return {
      tickets: rawTickets.map((row) => ({
        ...row.ticket,
        department: row.department,
        service: row.service,
        client: row.client,
        assignedTo: row.assignedTo?.id ? row.assignedTo : null,
      })),
      total: Number(totalCount),
    };
  },
};

function buildListTicketsWhereClause(query: ListTicketsQueryDTO) {
  const conditions: SQL[] = [];

  // 1. Garantir que não listamos registros deletados logicamente (Soft Delete)
  conditions.push(isNull(tickets.deletedAt));

  // 2. Trava de Segurança por Permissão (Scope)
  if (query.scope?.role === "CLIENT") {
    conditions.push(eq(tickets.clientId, query.scope.userId));
  } else if (query.scope?.role === "TECHNICIAN") {
    conditions.push(
      or(
        eq(tickets.clientId, query.scope.userId),
        eq(tickets.agentId, query.scope.userId),
      )!,
    );
  }

  // 3. Filtros da Interface (UI)
  if (query.status) {
    conditions.push(eq(tickets.status, query.status));
  }
  if (query.priority) {
    conditions.push(eq(tickets.priority, query.priority));
  }
  if (query.departmentId) {
    conditions.push(eq(tickets.departmentId, query.departmentId));
  }
  if (query.assignmentState === "ASSIGNED") {
    conditions.push(isNotNull(tickets.agentId));
  } else if (query.assignmentState === "UNASSIGNED") {
    conditions.push(isNull(tickets.agentId));
  }

  // 4. Busca por Texto (Busca em Título ou Descrição)
  if (query.search) {
    const searchPattern = `%${query.search}%`;
    conditions.push(
      or(
        ilike(tickets.title, searchPattern),
        ilike(tickets.description, searchPattern),
      )!,
    );
  }

  return conditions.length > 0 ? and(...conditions) : undefined;
}
