import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { departments,services } from "./catalog";
import { users } from "./users";

// 1. Definição dos Enums Nativos do PostgreSQL
export const ticketStatusEnum = pgEnum("ticket_status", [
  "OPEN",
  "WAITING_SUPPORT",
  "VIEWED",
  "WAITING_CLIENT",
  "WAITING_AGENT",
  "CLOSED",
  "RESOLVED",
]);

export const ticketPriorityEnum = pgEnum("ticket_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

export const assignmentModeEnum = pgEnum("assignment_mode", [
  "MANUAL",
  "WORKLOAD_BALANCED",
]);

export const assignmentStateEnum = pgEnum("assignment_state", [
  "ALL",
  "ASSIGNED",
  "UNASSIGNED",
]);

// 2. Tabela de Tickets no Postgres
export const tickets = pgTable("tickets", {
  // UUID nativo com geração automática de ID no banco
  id: uuid("id").defaultRandom().primaryKey(),
  
  title: text("title").notNull(),
  description: text("description").notNull(),

  // Enums estritamente tipados
  status: ticketStatusEnum("status").notNull().default("WAITING_SUPPORT"),
  priority: ticketPriorityEnum("priority").notNull().default("MEDIUM"),

  // Chaves estrangeiras (Foreign Keys)
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "restrict" }),

  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "restrict" }),

  // 🟢 AGORA UUID: Compatível com users.id
  clientId: uuid("client_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),

  // 🟢 AGORA UUID: Compatível com users.id
  agentId: uuid("agent_id")
    .references(() => users.id, { onDelete: "set null" }),

  // Timestamps Nativos do Postgres com Fuso Horário
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()), // Atualiza a data automaticamente ao editar o registro
    // 🟢 Soft Delete: Null = Ativo | Data = Inativo/Deletado
  deletedAt: timestamp("deleted_at"),
});

// 3. Relações do Drizzle
export const ticketsRelations = relations(tickets, ({ one }) => ({
  department: one(departments, {
    fields: [tickets.departmentId],
    references: [departments.id],
  }),
  service: one(services, {
    fields: [tickets.serviceId],
    references: [services.id],
  }),
  client: one(users, {
    fields: [tickets.clientId],
    references: [users.id],
    relationName: "client_tickets",
  }),
  agent: one(users, {
    fields: [tickets.agentId],
    references: [users.id],
    relationName: "agent_tickets",
  }),
}));