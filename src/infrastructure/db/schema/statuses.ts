// src/infrastructure/db/schema/statuses.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const ticketStatuses = pgTable("ticket_statuses", {
  // Se for usar UUID gerado pelo banco. 
  // (Caso prefira slugs manuais como 'awaiting-triage', basta remover o .defaultRandom())
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull().unique(), // Ex: "Awaiting Triage"
  description: text("description"),

  // Timestamp nativo do Postgres com Fuso Horário
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});