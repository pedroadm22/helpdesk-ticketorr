// src/shared/types/db.type.ts
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  users,
  departments,
  services,
  tickets,
  chatMessages,
} from "@/infrastructure/db/schema";

// 1. Modelos de Seleção (Entidades puras da tabela, 1 para 1 com o banco)
export type User = InferSelectModel<typeof users>;
export type Department = InferSelectModel<typeof departments>;
export type Service = InferSelectModel<typeof services>;
export type Ticket = InferSelectModel<typeof tickets>;
export type ChatMessage = InferSelectModel<typeof chatMessages>;

// 2. Modelos de Inserção (Para queries brutas de Insert)
export type NewUser = InferInsertModel<typeof users>;
export type NewDepartment = InferInsertModel<typeof departments>;
export type NewService = InferInsertModel<typeof services>;
export type NewTicket = InferInsertModel<typeof tickets>;
export type NewChatMessage = InferInsertModel<typeof chatMessages>;