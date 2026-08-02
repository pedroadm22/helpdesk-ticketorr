import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const userResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: userRoleZodSchema,
  departmentId: z.string().uuid().nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserResponseDTO = z.infer<typeof userResponseSchema>;