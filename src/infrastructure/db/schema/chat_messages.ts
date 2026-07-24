// src/infrastructure/db/schema/chat_messages.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tickets } from "./tickets";
import { users } from "./auth";

export const chatMessages = pgTable("chat_messages", {
  // 1. UUID nativo com geração automática
  id: uuid("id").defaultRandom().primaryKey(),

  // 2. Foreign key com tipo UUID nativo
  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),

  senderId: text("user_id") // Ou uuid("user_id") caso a tabela de usuários use UUID
    .notNull()
    .references(() => users.id),

  message: text("message").notNull(),

  // 3. Data nativa do Postgres com Timezone UTC
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});