import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

export const departments = pgTable("departments", {
  // Identity do Postgres moderno: substitui o SERIAL legado e funciona 100% com .primaryKey()
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at", { mode: "date" })
    .defaultNow()
    .notNull(),
});

export type Department = typeof departments.$inferSelect;
export type NewDepartment = typeof departments.$inferInsert;