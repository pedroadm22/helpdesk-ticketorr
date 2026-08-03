import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const updateUserSchema = z.object({
  id: z.uuid("ID de usuário inválido."),
  name: z.string().trim().min(2).max(100).optional(),
  email: z.email("E-mail inválido.").trim().toLowerCase().optional(),
  role: userRoleZodSchema.optional(),
  departmentId: z.string().uuid().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
});

export type UpdateUserDTO = z.infer<typeof updateUserSchema>;