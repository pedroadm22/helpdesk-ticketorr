import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ticketPriorities = sqliteTable("ticket_priorities", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(), // ex: "Low", "Medium", "High", "Urgent"
  description: text("description"),
});