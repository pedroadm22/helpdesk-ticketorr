// src/infrastructure/db/schema/tickets.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { ticketStatuses } from "./statuses";
import { ticketPriorities } from "./priorities";
import { departments } from "./departments";
import { services } from "./services";
import { user } from "./auth"; // Tabela de usuários vinda do Better Auth / Auth.ts

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(), // UUID
  title: text("title").notNull(),
  description: text("description").notNull(),

  // Relacionamentos e Categorias
  statusId: text("status_id")
    .notNull()
    .references(() => ticketStatuses.id),
  priorityId: text("priority_id")
    .notNull()
    .references(() => ticketPriorities.id),
  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id),
  serviceId: text("service_id")
    .notNull()
    .references(() => services.id),

  // Atores do Chamado
  clientId: text("client_id")
    .notNull()
    .references(() => user.id), // Quem abriu
  technicianId: text("technician_id").references(() => user.id), // Quem está resolvendo (pode ser nulo inicialmente)
  adminId: text("admin_id").references(() => user.id), // Administrador supervisor (opcional)

  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});
