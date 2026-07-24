// src/infrastructure/db/schema/departments.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { services } from "./services";

export const departments = pgTable("departments", {
  // UUID nativo gerado no banco
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull().unique(), // Ex: "TI", "Infraestrutura", "RH"
  description: text("description"),

  // Timestamps nativos do Postgres
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Definição da relação um-para-muitos (Um departamento tem vários serviços)
export const departmentsRelations = relations(departments, ({ many }) => ({
  services: many(services),
}));