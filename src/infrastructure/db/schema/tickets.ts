import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { departments } from "./departments";
import { services } from "./services";
import { user } from "./auth"; // 🌟 Importa a tabela "user" (no singular) do seu arquivo de autenticação

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  
  status: text("status", { 
    enum: ["OPEN", "IN_PROGRESS", "PENDING", "RESOLVED", "CLOSED"] 
  }).notNull().default("OPEN"),

  priority: text("priority", { 
    enum: ["LOW", "MEDIUM", "HIGH", "URGENT"] 
  }).notNull().default("MEDIUM"),

  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "restrict" }),
  
  serviceId: text("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "restrict" }),

  // 👤 Aponta corretamente para o "user.id" (no singular) do Better Auth
  clientId: text("client_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),

  agentId: text("agent_id")
    .references(() => user.id, { onDelete: "set null" }),

  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const ticketsRelations = relations(tickets, ({ one }) => ({
  department: one(departments, {
    fields: [tickets.departmentId],
    references: [departments.id],
  }),
  service: one(services, {
    fields: [tickets.serviceId],
    references: [services.id],
  }),
  // 🔗 Mapeia as relações apontando para "user"
  client: one(user, {
    fields: [tickets.clientId],
    references: [user.id],
    relationName: "client_tickets",
  }),
  agent: one(user, {
    fields: [tickets.agentId],
    references: [user.id],
    relationName: "agent_tickets",
  }),
}));