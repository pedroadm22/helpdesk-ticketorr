// src/infrastructure/db/schema/chat_messages.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { tickets } from "./tickets";
import { user } from "./auth";

export const chatMessages = sqliteTable("chat_messages", {
  id: text("id").primaryKey(), // UUID
  ticketId: text("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }), // Se o ticket sumir, as mensagens também vão
  senderId: text("user_id")
    .notNull()
    .references(() => user.id), // Quem enviou a mensagem (cliente ou técnico)
  message: text("message").notNull(),
  
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});