import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { tickets } from "./tickets";
import { user } from "./auth";

export const chatMessages = sqliteTable("chat_messages", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id").notNull().references(() => tickets.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => user.id),
  message: text("message").notNull(),
  
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date()),
});