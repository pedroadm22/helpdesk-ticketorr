import { eq, and, desc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages"; // Ajuste para o seu schema de mensagens
import { user } from "@/infrastructure/db/schema/auth"; // Schema de usuários/clientes do Better Auth
import {
  ITicketRepository,
  TicketEntity,
  TicketInsert,
  TicketMessageEntity,
  TicketMessageInsert,
  TicketWithDetails,
} from "./ticket.repository.interface";

export class TicketRepository implements ITicketRepository {
  async create(data: TicketInsert): Promise<TicketEntity> {
    const [inserted] = await db.insert(tickets).values(data).returning();

    if (!inserted) {
      throw new Error("Erro ao criar o chamado no banco de dados.");
    }

    return inserted;
  }

  async findById(id: string): Promise<TicketEntity | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));

    return ticket || null;
  }

  async findByIdWithDetails(id: string): Promise<TicketWithDetails | null> {
    // 🌟 Join com a tabela de usuários para carregar as informações do cliente
    const rows = await db
      .select({
        ticket: tickets,
        cliente: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      })
      .from(tickets)
      .innerJoin(user, eq(tickets.clientId, user.id))
      .where(eq(tickets.id, id));

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      ...row.ticket,
      cliente: row.cliente,
    };
  }

  async findByProtocolo(protocolo: string): Promise<TicketEntity | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, protocolo));

    return ticket || null;
  }

  async findByClienteId(clienteId: string): Promise<TicketEntity[]> {
    return await db
      .select()
      .from(tickets)
      .where(eq(tickets.agentId, clienteId))
      .orderBy(desc(tickets.createdAt));
  }

  async findAll(filters?: { status?: string; departmentId?: string }): Promise<TicketEntity[]> {
    let query = db.select().from(tickets);

    // Aplicação simples de filtros dinâmicos se forem informados
    if (filters?.status && filters?.departmentId) {
      return await query.where(
        and(
          eq(tickets.status, filters.status as TicketEntity["status"]),
          eq(tickets.departmentId, filters.departmentId)
        )
      );
    }

    if (filters?.status) {
      return await query.where(eq(tickets.status, filters.status as TicketEntity["status"]));
    }

    if (filters?.departmentId) {
      return await query.where(eq(tickets.departmentId, filters.departmentId));
    }

    return await query.orderBy(desc(tickets.createdAt));
  }

  async update(
    id: string,
    data: Partial<TicketInsert>
  ): Promise<TicketEntity | null> {
    const [updated] = await db
      .update(tickets)
      .set({
        ...data,
        updatedAt: new Date(), // Usando formato ISO seguro para colunas TEXT
      })
      .where(eq(tickets.id, id))
      .returning();

    return updated || null;
  }

  // 💬 --- MÉTODOS DO CHAT ---

  async addMessage(data: TicketMessageInsert): Promise<TicketMessageEntity> {
    const [inserted] = await db
      .insert(chatMessages)
      .values(data)
      .returning();

    if (!inserted) {
      throw new Error("Erro ao salvar mensagem no histórico do chamado.");
    }

    return inserted;
  }

  async getChatHistory(ticketId: string): Promise<TicketMessageEntity[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(chatMessages.createdAt); // Ordena da mensagem mais antiga para a mais recente
  }
}