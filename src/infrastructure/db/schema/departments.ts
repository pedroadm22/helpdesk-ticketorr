import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const departments = sqliteTable("departments", {
  id: text("id").primaryKey(), // UUID gerado na aplicação (v4)
  name: text("name").notNull().unique(), // Ex: "TI", "Infrastructure", "HR"
  description: text("description"), // Opcional
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});