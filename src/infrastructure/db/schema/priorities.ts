// src/infrastructure/db/schema/priorities.ts
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const ticketPriorities = pgTable("ticket_priorities", {
  // Slug manual como chave primária (ex: 'low', 'medium', 'high', 'urgent')
  id: text("id").primaryKey(),

  name: text("name").notNull().unique(), // Ex: "Alta"
  level: integer("level").notNull(), // Nível numérico para ordenação (ex: 1, 2, 3, 4)
  description: text("description"),

  // Timestamp nativo do Postgres com Fuso Horário
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});