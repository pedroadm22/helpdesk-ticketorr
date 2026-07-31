import { pgTable, text, timestamp, uuid, boolean, jsonb } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { tickets } from "./tickets";

export const chatMessages = pgTable("chat_messages", {
  id: uuid("id").primaryKey().defaultRandom(),

  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => tickets.id, { onDelete: "cascade" }),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  content: text("content").notNull(),

  // 1. Mensagens Internas / Notas de Agentes
  isInternal: boolean("is_internal").default(false).notNull(),

  // 2. Anexos de Arquivos (Imagens, PDFs, logs)
  attachments: jsonb("attachments").$type<
    Array<{
      name: string;
      url: string;
      type: string; // ex: "image/png" | "application/pdf"
      size: number;
    }>
  >(),

  // 3. Controle de Leitura
  readAt: timestamp("read_at", { mode: "date", withTimezone: true }),

  // 4. Auditoria de Edição
  editedAt: timestamp("edited_at", { mode: "date", withTimezone: true }),

  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});