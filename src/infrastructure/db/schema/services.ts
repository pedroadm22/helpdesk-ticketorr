import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { departments } from "./departments"; // Importa a tabela pai para a relação

export const services = sqliteTable("services", {
  id: text("id").primaryKey(), // UUID gerado na aplicação (v4)
  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }), // Chave estrangeira
  name: text("name").notNull(), // Ex: "Reset Password", "Wi-Fi Issue"
  description: text("description"), // Opcional
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});