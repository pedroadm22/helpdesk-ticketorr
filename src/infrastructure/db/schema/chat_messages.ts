import { pgTable, text, timestamp, uuid, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { tickets } from "./tickets";

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),

  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  content: text("content").notNull(),
  isInternal: boolean("is_internal").default(false).notNull(),

  attachments: jsonb("attachments").$type<
    Array<{
      name: string;
      url: string;
      type: string;
      size: number;
    }>
  >(),

  readAt: timestamp("read_at", { mode: "date", withTimezone: true }),
  editedAt: timestamp("edited_at", { mode: "date", withTimezone: true }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});

// 🟢 Relações das mensagens do Chat
export const chatMessagesRelations = relations(chatMessages, ({ one }) => ({
  ticket: one(tickets, {
    fields: [chatMessages.ticketId],
    references: [tickets.id],
  }),
  user: one(users, {
    fields: [chatMessages.userId],
    references: [users.id],
  }),
}));