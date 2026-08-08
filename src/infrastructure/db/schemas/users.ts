import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { departments } from "./departments";
import { userRoleEnum } from "./enums/user-roles";
import { tickets } from "./tickets";
import { relations } from "drizzle-orm/_relations";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum("role").default("CLIENT").notNull(),
  departmentId: uuid("department_id").references(() => departments.id, {
    onDelete: "set null",
  }), // Se for AGENT
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  department: one(departments, { fields: [users.departmentId], references: [departments.id] }),
  openedTickets: many(tickets, { relationName: 'clientTickets' }),
  assignedTickets: many(tickets, { relationName: 'agentTickets' }),
}));