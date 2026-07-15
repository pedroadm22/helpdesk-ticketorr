import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { ticketStatuses } from "./statuses";
import { ticketPriorities } from "./priorities";
import { departments } from "./departments";
import { services } from "./services";

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  
  statusId: text("status_id").notNull().references(() => ticketStatuses.id),
  priorityId: text("priority_id").notNull().references(() => ticketPriorities.id),
  departmentId: text("department_id").notNull().references(() => departments.id),
  serviceId: text("service_id").notNull().references(() => services.id),
  
  clientId: text("client_id").notNull().references(() => user.id),
  technicianId: text("technician_id").references(() => user.id),
  adminId: text("admin_id").references(() => user.id),
  
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});