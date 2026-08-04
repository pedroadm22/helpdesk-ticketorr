import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { departments } from "./catalog";
import { tickets } from "./tickets";

export const userRoleEnum = pgEnum("user_role", [
  "CLIENT",
  "TECHNICIAN",
  "ADMIN",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image").default("https://ui-avatars.com/api/?name=User&background=random"),
  role: userRoleEnum("role").notNull().default("CLIENT"),
  departmentId: uuid("department_id").references(() => departments.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// 🟢 CRÍTICO: Relações de Usuário para resolver o erro 'referencedTable'
export const usersRelations = relations(users, ({ one, many }) => ({
  department: one(departments, {
    fields: [users.departmentId],
    references: [departments.id],
  }),
  clientTickets: many(tickets, {
    relationName: "client_tickets",
  }),
  agentTickets: many(tickets, {
    relationName: "agent_tickets",
  }),
}));