import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core"; 



export const departments = pgTable("departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const servicePriorityEnum = pgEnum("service_priority", [
  "LOW",
  "MEDIUM",
  "HIGH",
  "URGENT",
]);

export const services = pgTable("services", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }), 
  service_priority: servicePriorityEnum("service_priority").notNull().default("LOW"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const departmentsRelations = relations(departments, ({ many }) => ({
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one }) => ({
  department: one(departments, {
    fields: [services.departmentId],
    references: [departments.id],
  }),
}));