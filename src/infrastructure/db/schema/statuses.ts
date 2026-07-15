// src/infrastructure/db/schema/statuses.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const ticketStatuses = sqliteTable("ticket_statuses", {
  id: text("id").primaryKey(), // Pode ser um UUID ou slugs como 'awaiting-triage'
  name: text("name").notNull().unique(), // Ex: "Awaiting Triage"
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});