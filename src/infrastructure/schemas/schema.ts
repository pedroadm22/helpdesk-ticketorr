// src/modules/tickets/schema.ts (Ou o caminho exato do seu arquivo único de schema)
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

// ==========================================
// 1. TABELA DE USUÁRIOS (Clientes e Técnicos)
// ==========================================
export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  perfil: text("perfil", { enum: ["CLIENTE", "TECNICO", "ADMIN"] }).notNull(),
  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 2. TABELA DE CHAMADOS (Tickets)
// ==========================================
export const tickets = sqliteTable("tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  protocolo: text("protocolo").notNull().unique(), // Ex: TK-2026-001
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  
  // Relacionamento: Vincula o ticket ao Cliente que o abriu
  clienteId: text("cliente_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  
  // Relacionamento: Vincula o ticket ao Técnico que assumiu o atendimento
  tecnicoId: text("tecnico_id")
    .references(() => users.id, { onDelete: "set null" }), 
  
  statusId: integer("status_id").notNull().default(1), 
  prioridadeId: integer("prioridade_id").notNull().default(1),

  dataLimiteSla: integer("data_limite_sla", { mode: "timestamp" }).notNull(),

  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  dataAtualizacao: integer("data_atualizacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 3. TABELA DE MENSAGENS DO CHAT
// ==========================================
export const mensagensChat = sqliteTable("mensagens_chat", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  
  // Relacionamento: Garante que a mensagem pertença a um chamado ativo
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),
  
  // Relacionamento: Descobre quem digitou a mensagem (buscando na tabela de users)
  remetenteId: text("remetente_id")
    .notNull()
    .references(() => users.id),
  
  conteudo: text("conteudo").notNull(), // O texto da conversa
  
  criadoEm: integer("criado_em", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// 4. INFERÊNCIA DE TIPOS DO TYPESCRIPT (Exports)
// ==========================================
export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type TicketSelect = typeof tickets.$inferSelect;
export type TicketInsert = typeof tickets.$inferInsert;

export type MensagemChatSelect = typeof mensagensChat.$inferSelect;
export type MensagemChatInsert = typeof mensagensChat.$inferInsert;