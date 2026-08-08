import { pgTable, uuid, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  departmentId: uuid("department_id")
    .references(() => departments.id, { onDelete: "restrict" })
    .notNull(),
  name: varchar("name", { length: 255 }).notNull(), // ex: "Acesso a Sistemas", "Outros"
  description: text("description"),
  slaHours: integer("sla_hours").default(24).notNull(),
  isFallback: boolean("is_fallback").default(false).notNull(), // Flag para indicar serviços tipo "Outros"
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});