import { tickets } from "@/infrastructure/db/schema/tickets";
import { chatMessages } from "@/infrastructure/db/schema/chat_messages"; // Ajuste o nome conforme seu schema do chat

// 🌟 Tipos exportados centralizados do Drizzle
export type TicketEntity = typeof tickets.$inferSelect;
export type TicketInsert = typeof tickets.$inferInsert;

export type TicketMessageEntity = typeof chatMessages.$inferSelect;
export type TicketMessageInsert = typeof chatMessages.$inferInsert;
export type TicketStatus = TicketEntity["status"];

// Tipo customizado para quando precisamos do chamado com os dados do cliente anexados
export type TicketWithDetails = TicketEntity & {
  cliente: {
    id: string;
    name: string;
    email: string;
  };
};

export interface ITicketRepository {
  create(data: TicketInsert): Promise<TicketEntity>;
  findById(id: string): Promise<TicketEntity | null>;
  findByIdWithDetails(id: string): Promise<TicketWithDetails | null>;
  findByProtocolo(protocolo: string): Promise<TicketEntity | null>;
  findByClienteId(clienteId: string): Promise<TicketEntity[]>;
  findAll(filters?: { status?: TicketStatus; departmentId?: string }): Promise<TicketEntity[]>;
  update(id: string, data: Partial<TicketInsert>): Promise<TicketEntity | null>;
  
  // 💬 Métodos para o Chat do Chamado
  addMessage(data: TicketMessageInsert): Promise<TicketMessageEntity>;
  getChatHistory(ticketId: string): Promise<TicketMessageEntity[]>;
}