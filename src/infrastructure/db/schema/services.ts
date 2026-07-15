import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { departments } from "./departments";

export const services = sqliteTable("services", {
  id: text("id").primaryKey(),
  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
});