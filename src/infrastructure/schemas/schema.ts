import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// ==========================================
// MÓDULO DE AUTENTICAÇÃO (PADRÃO BETTER AUTH)
// ==========================================

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" })
    .default(false)
    .notNull(),
  image: text("image"),
  role: text("role", { enum: ["CLIENTE", "TECNICO", "ADMIN"] })
    .default("CLIENTE")
    .notNull(), // Voltamos para 'role' para automação total
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$onUpdate(() => new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"), // Corrigido para o singular
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Corrigido para o singular
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }), // Corrigido para o singular
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp_ms",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp_ms",
  }),
  scope: text("scope"),
  password: text("password"), // O Better Auth salva o hash da senha automaticamente aqui
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relacionamentos corrigidos (Sem os colchetes no 'references' do método 'one')
export const userRelations = relations(users, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(users, {
    fields: [session.userId],
    references: [users.id], // Removido colchetes internos que quebravam o Drizzle
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(users, {
    fields: [account.userId],
    references: [users.id], // Removido colchetes internos que quebravam o Drizzle
  }),
}));

// ==========================================
// MÓDULO DE TICKETS E SISTEMA DE CHAMADOS
// ==========================================

export const statusChamado = sqliteTable("status_chamado", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const prioridadesChamado = sqliteTable("prioridades_chamado", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  protocolo: text("protocolo").notNull().unique(),
  titulo: text("titulo").notNull(),
  descricao: text("descricao").notNull(),
  clienteId: text("cliente_id")
    .notNull()
    .references(() => users.id), // Apontando para 'users.id' atualizado
  statusId: integer("status_id")
    .notNull()
    .references(() => statusChamado.id)
    .default(1),
  prioridadeId: integer("prioridade_id")
    .notNull()
    .references(() => prioridadesChamado.id),
  dataLimiteSla: integer("data_limite_sla", { mode: "timestamp_ms" }).notNull(),
  dataCriacao: integer("data_creation", { mode: "timestamp_ms" }).notNull(),
  dataAtualizacao: integer("data_atualizacao", { mode: "timestamp_ms" }).notNull(),
});

export const mensagensChat = sqliteTable("mensagens_chat", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id),
  remetenteId: text("remetente_id")
    .notNull()
    .references(() => users.id), // Apontando para 'users.id' atualizado
  conteudo: text("conteudo").notNull(),
  criadoEm: integer("criado_em", { mode: "timestamp_ms" }).notNull(),
});