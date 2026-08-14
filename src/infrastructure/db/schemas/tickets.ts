import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { departments } from "./departments";
import { services } from "./services";

// Enums nativos do Postgres para o ciclo de vida do chamado
export const ticketStatusEnum = pgEnum("ticket_status", ["OPEN, "]);

export const ticketPriorityEnum = pgEnum("ticket_priority", ALL_TICKET_PRIORITIES);

export const tickets = pgTable("tickets", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  status: ticketStatusEnum("status").default("OPEN").notNull(),
  priority: ticketPriorityEnum("priority").default("MEDIUM").notNull(),
  
  // Relacionamentos e chaves estrangeiras
  clientId: uuid("client_id")
    .notNull()
    .references(() => users.id),
  assignedAgentId: uuid("assigned_agent_id")
    .references(() => users.id),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id),
  serviceId: uuid("service_id")
    .notNull()
    .references(() => services.id),

  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export type Ticket = typeof tickets.$inferSelect;
export type NewTicket = typeof tickets.$inferInsert;