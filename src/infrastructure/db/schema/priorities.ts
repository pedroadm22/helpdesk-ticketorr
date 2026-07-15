// src/infrastructure/db/schema/priorities.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const ticketPriorities = sqliteTable("ticket_priorities", {
  id: text("id").primaryKey(), // Ex: 'low', 'medium', 'high', 'urgent'
  name: text("name").notNull().unique(), // Ex: "High"
  level: integer("level").notNull(), // Nível numérico para ordenação (ex: 1 a 4)
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});