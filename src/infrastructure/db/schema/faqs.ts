import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { departments } from "./departments";
import { services } from "./services";

export const faqs = sqliteTable("faq_problems", {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text().unique(),
  question: text().notNull(),
  answer: text().notNull(),
  
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),

  // Chaves estrangeiras inline na nova sintaxe
  departmentId: text("department_id").references(() => departments.id, { onDelete: "set null" }),
  serviceId: text("service_id").references(() => services.id, { onDelete: "set null" }),

  usefulCount: integer("useful_count").notNull().default(0),
  notUsefulCount: integer("not_useful_count").notNull().default(0),

  createdAt: text("created_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").notNull().default(sql`(CURRENT_TIMESTAMP)`),
}, 
// Nova forma de declarar índices e restrições compostas como segundo argumento
(table) => [
  index("faq_department_idx").on(table.departmentId),
  index("faq_service_idx").on(table.serviceId),
]);