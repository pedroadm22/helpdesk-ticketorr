// src/shared/schemas/zod.types.ts
import { z } from "zod";
import {
  userRoleEnum,
  ticketStatusEnum,
  ticketPriorityEnum,
  assignmentModeEnum,
  assignmentStateEnum,
} from "@/infrastructure/db/schema";

// Schemas Zod criados dinamicamente dos enums do Drizzle
export const userRoleZodSchema = z.enum(userRoleEnum.enumValues);
export const ticketStatusZodSchema = z.enum(ticketStatusEnum.enumValues);
export const ticketPriorityZodSchema = z.enum(ticketPriorityEnum.enumValues);
export const assignmentModeZodSchema = z.enum(assignmentModeEnum.enumValues);
export const assignmentStateZodSchema = z.enum(assignmentStateEnum.enumValues);


export type AssignmentMode = z.infer<typeof assignmentModeZodSchema>;
export type UserRole = z.infer<typeof userRoleZodSchema>;
export type TicketStatus = z.infer<typeof ticketStatusZodSchema>;
export type TicketPriority = z.infer<typeof ticketPriorityZodSchema>;
export type AssignmentState = z.infer<typeof assignmentStateZodSchema>;