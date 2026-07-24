// src/infrastructure/db/schema/faqs.ts
import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { departments } from "./departments";
import { services } from "./services";

export const faqs = pgTable(
  "faq_problems",
  {
    // 1. UUID Nativo do Postgres gerado pelo banco
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").unique(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),

    // 2. Boolean nativo
    isActive: boolean("is_active").notNull().default(true),

    // 3. Chaves Estrangeiras com UUID
    departmentId: uuid("department_id").references(() => departments.id, {
      onDelete: "set null",
    }),
    serviceId: uuid("service_id").references(() => services.id, {
      onDelete: "set null",
    }),

    // 4. Contadores Nativos
    usefulCount: integer("useful_count").notNull().default(0),
    notUsefulCount: integer("not_useful_count").notNull().default(0),

    // 5. Timestamps Nativos do Postgres com Fuso Horário
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  // Sintaxe moderna de índices no Drizzle (passada no segundo argumento)
  (table) => [
    index("faq_department_idx").on(table.departmentId),
    index("faq_service_idx").on(table.serviceId),
  ]
);

// 🤝 Relações para facilitar consultas com db.query.faqs.findMany({ with: { department: true, service: true } })
export const faqsRelations = relations(faqs, ({ one }) => ({
  department: one(departments, {
    fields: [faqs.departmentId],
    references: [departments.id],
  }),
  service: one(services, {
    fields: [faqs.serviceId],
    references: [services.id],
  }),
}));