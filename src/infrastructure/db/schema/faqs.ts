import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { departments } from "./departments";
import { services } from "./services";

export const faqs = sqliteTable("faq_problems", {
  id: text("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  
  // Suggesting these fields automatically if the FAQ doesn't solve the issue
  departmentId: text("department_id").references(() => departments.id, { onDelete: "set null" }),
  serviceId: text("service_id").references(() => services.id, { onDelete: "set null" }),
});