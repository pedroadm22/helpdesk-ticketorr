import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { v4 as uuidv4 } from "uuid";

// 1. Tabela de Usuários (Clientes e Técnicos)
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  perfil: text("perfil", { enum: ["CLIENTE", "TECNICO", "ADMIN"] }).notNull(),
  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// 2. Tabela de Chamados (Tickets)
export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey().$defaultFn(() => uuidv4()),
  protocolo: text("protocolo").notNull().unique(), // Ex: TK-2026-001
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  
  clienteId: text("cliente_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  
  tecnicoId: text("tecnico_id")
    .references(() => users.id, { onDelete: "set null" }), 
  
  statusId: integer("status_id").notNull().default(1), 
  prioridadeId: integer("prioridade_id").notNull().default(1),

  // Adicionado de forma limpa para armazenar o prazo do chamado
  dataLimiteSla: integer("data_limite_sla", { mode: "timestamp" }).notNull(),

  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  dataAtualizacao: integer("data_atualizacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export type UserSelect = typeof users.$inferSelect;
export type TicketSelect = typeof tickets.$inferSelect;
export type UserInsert = typeof users.$inferInsert;
export type TicketInsert = typeof tickets.$inferInsert;