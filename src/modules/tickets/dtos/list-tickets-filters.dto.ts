// src/modules/tickets/dtos/list-tickets-filters.dto.ts
import { z } from "zod";
import {
  ticketStatusZodSchema,
  ticketPriorityZodSchema,
  assignmentStateZodSchema,
  UserRole,
} from "@/shared/types/domain/zod.types";

// 1. Schema para validar o que vem da query string / UI
export const listTicketsFilterSchema = z.object({
  search: z.string().optional(),
  status: ticketStatusZodSchema.optional(),
  priority: ticketPriorityZodSchema.optional(),
  departmentId: z.string().uuid().optional(),
  assignmentState: assignmentStateZodSchema.optional().default("ALL"),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type ListTicketsFilterDTO = z.infer<typeof listTicketsFilterSchema>;

// 2. DTO estendido com o escopo de segurança para o Banco de Dados
export type ListTicketsQueryDTO = ListTicketsFilterDTO & {
  scope?: {
    userId: string;
    role: UserRole;
  };
};