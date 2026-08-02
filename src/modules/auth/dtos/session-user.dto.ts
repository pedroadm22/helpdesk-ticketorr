// src/modules/auth/dtos/session-user.dto.ts
import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const sessionUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: userRoleZodSchema,
  departmentId: z.string().uuid().nullable().optional(),
});

export type SessionUserDTO = z.infer<typeof sessionUserSchema>;