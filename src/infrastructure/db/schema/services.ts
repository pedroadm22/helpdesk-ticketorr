// src/infrastructure/db/schema/services.ts
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { departments } from "./departments";

export const services = pgTable("services", {
  // UUID nativo
  id: uuid("id").defaultRandom().primaryKey(),

  // Chave estrangeira com tipo UUID apontando para departments.id
  departmentId: uuid("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "cascade" }),

  name: text("name").notNull(), // Ex: "Reset de Senha", "Problema no Wi-Fi"
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

// Definição da relação muitos-para-um (Vários serviços pertencem a um departamento)
export const servicesRelations = relations(services, ({ one }) => ({
  department: one(departments, {
    fields: [services.departmentId],
    references: [departments.id],
  }),
}));