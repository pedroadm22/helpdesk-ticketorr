import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ticketStatuses = sqliteTable("ticket_statuses", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(), // ex: "Awaiting Triage", "In Progress", "Resolved"
  description: text("description"),
});