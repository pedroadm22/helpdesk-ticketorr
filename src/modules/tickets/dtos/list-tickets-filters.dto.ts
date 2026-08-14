// src/modules/tickets/dtos/list-tickets-filters.dto.ts
import { z } from "zod";
import {
  ticketStatusZodSchema,
  ticketPriorityZodSchema,
  assignmentStateZodSchema,
  UserRole,
} from "@/shared/types/domain/zod.types";

// 1. Schema para validar os parâmetros recebidos
export const listTicketsFilterSchema = z.object({
  search: z.string().optional(),
  status: ticketStatusZodSchema.optional(),
  priority: ticketPriorityZodSchema.optional(),
  departmentId: z.string().uuid().optional(),
  // 🟢 Adicionamos .optional() antes do .default() para permitir omitir na chamada
  assignmentState: assignmentStateZodSchema.optional().default("ALL"),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
});

// 🟢 Usa z.input para permitir passar objetos sem page, limit e assignmentState
export type ListTicketsFilterDTO = z.input<typeof listTicketsFilterSchema>;

// 2. DTO estendido com o escopo de segurança para o Banco de Dados
export type ListTicketsQueryDTO = ListTicketsFilterDTO & {
  scope?: {
    userId: string;
    role: UserRole;
  };
};