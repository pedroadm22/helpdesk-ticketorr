import { eq, and, desc, asc } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages";
import { users } from "@/infrastructure/db/schema/auth";

// 🌟 Tipos exportados diretamente das tabelas do Drizzle
export type TicketEntity = typeof tickets.$inferSelect;
export type TicketInsert = typeof tickets.$inferInsert;

export type TicketMessageEntity = typeof chatMessages.$inferSelect;
export type TicketMessageInsert = typeof chatMessages.$inferInsert;

export type TicketWithDetails = TicketEntity & {
  cliente: {
    id: string;
    name: string;
    email: string;
  };
};

export const ticketRepository = {
  async create(data: TicketInsert): Promise<TicketEntity> {
    const [inserted] = await db.insert(tickets).values(data).returning();

    if (!inserted) {
      throw new Error("Erro ao criar o chamado no banco de dados.");
    }

    return inserted;
  },

  async findById(id: string): Promise<TicketEntity | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, id));

    return ticket || null;
  },

  async findByIdWithDetails(id: string): Promise<TicketWithDetails | null> {
    const rows = await db
      .select({
        ticket: tickets,
        cliente: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(tickets)
      .innerJoin(users, eq(tickets.clientId, users.id))
      .where(eq(tickets.id, id));

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      ...row.ticket,
      cliente: row.cliente,
    };
  },

  async findByProtocolo(protocolo: string): Promise<TicketEntity | null> {
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, protocolo));

    return ticket || null;
  },

  async findByClienteId(clienteId: string): Promise<TicketEntity[]> {
    return await db
      .select()
      .from(tickets)
      .where(eq(tickets.clientId, clienteId))
      .orderBy(desc(tickets.createdAt));
  },

  async findAll(filters?: { status?: string; departmentId?: string }): Promise<TicketEntity[]> {
    if (filters?.status && filters?.departmentId) {
      return await db
        .select()
        .from(tickets)
        .where(
          and(
            eq(tickets.status, filters.status as TicketEntity["status"]),
            eq(tickets.departmentId, filters.departmentId)
          )
        )
        .orderBy(desc(tickets.createdAt));
    }

    if (filters?.status) {
      return await db
        .select()
        .from(tickets)
        .where(eq(tickets.status, filters.status as TicketEntity["status"]))
        .orderBy(desc(tickets.createdAt));
    }

    if (filters?.departmentId) {
      return await db
        .select()
        .from(tickets)
        .where(eq(tickets.departmentId, filters.departmentId))
        .orderBy(desc(tickets.createdAt));
    }

    return await db.select().from(tickets).orderBy(desc(tickets.createdAt));
  },

  async update(
    id: string,
    data: Partial<TicketInsert>
  ): Promise<TicketEntity | null> {
    const [updated] = await db
      .update(tickets)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(tickets.id, id))
      .returning();

    return updated || null;
  },

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
  },

  async getChatHistory(ticketId: string): Promise<TicketMessageEntity[]> {
    return await db
      .select()
      .from(chatMessages)
      .where(eq(chatMessages.ticketId, ticketId))
      .orderBy(asc(chatMessages.createdAt));
  },
};