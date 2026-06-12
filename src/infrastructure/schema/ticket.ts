import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

// 1. Tabela de Usuários (Clientes e Técnicos)
export const users = sqliteTable("users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  perfil: text("perfil", { enum: ["CLIENTE", "TECNICO", "ADMIN"] }).notNull(),
  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// 2. Tabela de Chamados (Tickets)
export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  protocolo: text("protocolo").notNull().unique(), // Ex: TK-2026-001
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  
  // Relacionamentos (Chaves Estrangeiras)
  clienteId: text("cliente_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  
  tecnicoId: text("tecnico_id")
    .references(() => users.id, { onDelete: "set null" }), // Nulo enquanto estiver na fila de triagem
  
  // Status e Prioridades simplificados como Integer/Text para este início rápido
  statusId: integer("status_id").notNull().default(1), // 1: Aberto, 2: Em Atendimento, 3: Pendente, 4: Resolvido
  prioridadeId: integer("prioridade_id").notNull().default(1), // 1: Baixa, 2: Média, 3: Alta, 4: Crítica

  dataCriacao: integer("data_criacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  dataAtualizacao: integer("data_atualizacao", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// Inferência de tipos para Seleção (quando você puxa dados do banco)
export type UserSelect = typeof users.$inferSelect;
export type TicketSelect = typeof tickets.$inferSelect;

// Inferência de tipos para Inserção (o que é obrigatório enviar ao criar um novo registro)
export type UserInsert = typeof users.$inferInsert;
export type TicketInsert = typeof tickets.$inferInsert;