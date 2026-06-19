import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Tabela de Usuários
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull().unique(),
  perfil: text("perfil", { enum: ["CLIENTE", "TECNICO", "ADMIN"] }).notNull(),
  senhaHash: text("senha").notNull(),
});

// Tabela Auxiliar de Status
export const statusChamado = sqliteTable("status_chamado", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(), // Aberto, Em Andamento, Fechado
});

// Tabela Auxiliar de Prioridades
export const prioridadesChamado = sqliteTable("prioridades_chamado", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  nome: text("nome").notNull(), // Baixa, Média, Alta, Crítica
});

// Tabela Principal de Tickets (Chamados)
export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  protocolo: text("protocolo").notNull().unique(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  clienteId: text("cliente_id")
    .notNull()
    .references(() => users.id),
  statusId: integer("status_id")
    .notNull()
    .references(() => statusChamado.id)
    .default(1),
  prioridadeId: integer("prioridade_id")
    .notNull()
    .references(() => prioridadesChamado.id),
  dataLimiteSla: integer("data_limite_sla", { mode: "timestamp" }).notNull(),
  dataCriacao: integer("data_criacao", { mode: "timestamp" }).notNull(),
  dataAtualizacao: integer("data_atualizacao", { mode: "timestamp" }).notNull(),
});

// Tabela de Mensagens do Chat (que criamos recentemente)
export const mensagensChat = sqliteTable("mensagens_chat", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id),
  remetenteId: text("remetente_id")
    .notNull()
    .references(() => users.id),
  conteudo: text("conteudo").notNull(),
  criadoEm: integer("criado_em", { mode: "timestamp" }).notNull(),
});
