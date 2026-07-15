// src/infrastructure/schemas/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { UserRole } from "@/shared/types/domain/user";

// ========================================================
// 1. ENTIDADE: USUÁRIOS
// ========================================================
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull(), // snake_case
  image: text("image"),
  role: text("role").$type<UserRole>().notNull().default("CLIENT"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`), // snake_case
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`), // snake_case
});

// ========================================================
// 2. ENTIDADES MANTER: STATUS E PRIORIDADES (Existentes)
// ========================================================
export const statusChamado = sqliteTable("status_chamado", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const prioridadesChamado = sqliteTable("prioridades_chamado", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

// ========================================================
// 3. ENTIDADES NOVAS: SETORES E SERVIÇOS DA TI
// ========================================================
export const setoresTi = sqliteTable("setores_ti", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull().unique(),
  descricao: text("descricao"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`),
});

export const servicosTi = sqliteTable("servicos_ti", {
  id: text("id").primaryKey(),
  setorId: text("setor_id")
    .notNull()
    .references(() => setoresTi.id, { onDelete: "cascade" }),
  nome: text("nome").notNull(),
  descricao: text("descricao"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`),
});

// ========================================================
// 4. ENTIDADE REFORMULADA: TICKETS (Chamados)
// ========================================================
export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  
  statusId: text("status_id")
    .notNull()
    .references(() => statusChamado.id),
  prioridadeId: text("prioridade_id")
    .notNull()
    .references(() => prioridadesChamado.id),

  setorId: text("setor_id")
    .notNull()
    .references(() => setoresTi.id),
  servicoId: text("servico_id")
    .notNull()
    .references(() => servicosTi.id),

  clienteId: text("cliente_id")
    .notNull()
    .references(() => user.id),
  adminId: text("admin_id")
    .references(() => user.id),
  tecnicoId: text("tecnico_id")
    .references(() => user.id),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`),
});

// ========================================================
// 5. ENTIDADE MANTER: MENSAGENS CHAT (Existente)
// ========================================================
export const mensagensChat = sqliteTable("mensagens_chat", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),
  usuarioId: text("usuario_id")
    .notNull()
    .references(() => user.id),
  mensagem: text("mensagem").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(strftime('%s', 'now') * 1000)`),
});

// ========================================================
// TABELAS PADRÃO DO BETTER AUTH (Convertidas para snake_case)
// ========================================================
export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(), // snake_case
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(), // snake_case
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(), // snake_case
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), // snake_case
  ipAddress: text("ip_address"), // snake_case
  userAgent: text("user_agent"), // snake_case
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(), // snake_case
  providerId: text("provider_id").notNull(), // snake_case
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }), // snake_case
  accessToken: text("access_token"), // snake_case
  refreshToken: text("refresh_token"), // snake_case
  idToken: text("id_token"), // snake_case
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }), // snake_case
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }), // snake_case
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(), // snake_case
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(), // snake_case
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(), // snake_case
  createdAt: integer("created_at", { mode: "timestamp" }), // snake_case
  updatedAt: integer("updated_at", { mode: "timestamp" }), // snake_case
});