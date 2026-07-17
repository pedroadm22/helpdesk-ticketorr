import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { departments } from "./departments";
import { services } from "./services";
import { user } from "./auth";

export const tickets = sqliteTable("tickets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  
  // 🌟 Status e Prioridades como Enums de texto direto na tabela (Sem tabelas separadas)
  status: text("status", { 
    enum: ["WAITING_SUPPORT", "VIEWED", "WAITING_CLIENT", "WAITING_AGENT", "CLOSED", "RESOLVED"] 
  }).notNull().default("WAITING_SUPPORT"),

  priority: text("priority", { 
    enum: ["LOW", "MEDIUM", "HIGH", "URGENT"] 
  }).notNull().default("MEDIUM"),

  // 🔗 Chaves estrangeiras (Foreign Keys)
  departmentId: text("department_id")
    .notNull()
    .references(() => departments.id, { onDelete: "restrict" }),
  
  serviceId: text("service_id")
    .notNull()
    .references(() => services.id, { onDelete: "restrict" }),

  clientId: text("client_id")
    .notNull()
    .references(() => user.id, { onDelete: "restrict" }),

  agentId: text("agent_id")
    .references(() => user.id, { onDelete: "set null" }), // Pode ser nulo até um técnico assumir

  // 📅 Timestamps gerenciados como Epoch Timestamps (inteiros) para o SQLite/Turso
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

// 🤝 Definição das relações do Drizzle (Drizzle Relations API)
export const ticketsRelations = relations(tickets, ({ one }) => ({
  department: one(departments, { 
    fields: [tickets.departmentId], 
    references: [departments.id] 
  }),
  service: one(services, { 
    fields: [tickets.serviceId], 
    references: [services.id] 
  }),
  client: one(user, { 
    fields: [tickets.clientId], 
    references: [user.id], 
    relationName: "client_tickets" 
  }),
  agent: one(user, { 
    fields: [tickets.agentId], 
    references: [user.id], 
    relationName: "agent_tickets" 
  }),
}));