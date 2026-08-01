// src/modules/tickets/dtos/get-tickets-filter.dto.ts
import { z } from "zod";
import { ticketPriorityZodSchema, ticketStatusZodSchema } from "@/shared/types/domain/zod.types";

export const getTicketsFilterSchema = z.object({
  clientId: z.uuid().optional(),
  agentId: z.uuid().optional(),
  departmentId: z.uuid().optional(),
  status: ticketStatusZodSchema.optional(),
  priority: ticketPriorityZodSchema.optional(),
  includeInactive: z.boolean().optional().default(false),
});

export type GetTicketsFilterDTO = z.infer<typeof getTicketsFilterSchema>;