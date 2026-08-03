import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const userResponseSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email().trim().toLowerCase(),
  role: userRoleZodSchema,
  departmentId: z.uuid().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDTO = z.infer<typeof userResponseSchema>;