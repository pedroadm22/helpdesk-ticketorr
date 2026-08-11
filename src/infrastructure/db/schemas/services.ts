import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";

export const services = pgTable("services", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  active: boolean("active").default(true).notNull(),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;