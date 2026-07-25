// Exemplo em chat_messages.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./auth"; // Ou "./auth" dependendo de onde está sua tabela de usuário

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  ticketId: uuid("ticket_id") // Certifique-se de que aqui também seja uuid se o ticket.id for uuid
    .notNull(),

  content: text("content").notNull(),
  
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});