import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm/_relations";
import { ticketStatusEnum, ticketPriorityEnum } from "./enums";
import { users } from "./users";
import { services } from "./services";
import { ticketComments } from "./ticket-messages";

export const tickets = pgTable(
  "tickets",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    code: varchar("code", { length: 20 }).notNull().unique(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    serviceId: uuid("service_id")
      .references(() => services.id, { onDelete: "restrict" })
      .notNull(),
    customCategory: varchar("custom_category", { length: 150 }),
    status: ticketStatusEnum("status").default("OPEN").notNull(),
    priority: ticketPriorityEnum("priority").default("MEDIUM").notNull(),
    clientId: uuid("client_id")
      .references(() => users.id, { onDelete: "restrict" })
      .notNull(),
    assignedAgentId: uuid("assigned_agent_id").references(() => users.id, {
      onDelete: "set null",
    }),
    slaDueDate: timestamp("sla_due_date").notNull(),
    resolvedAt: timestamp("resolved_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    index("tickets_status_idx").on(table.status),
    index("tickets_client_idx").on(table.clientId),
    index("tickets_agent_idx").on(table.assignedAgentId),
    index("tickets_service_idx").on(table.serviceId),
    index("tickets_sla_due_date_idx").on(table.slaDueDate),
  ],
);

export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  client: one(users, {
    fields: [tickets.clientId],
    references: [users.id],
    relationName: "clientTickets",
  }),
  assignedAgent: one(users, {
    fields: [tickets.assignedAgentId],
    references: [users.id],
    relationName: "agentTickets",
  }),
  service: one(services, {
    fields: [tickets.serviceId],
    references: [services.id],
  }),
  comments: many(ticketComments),
}));
