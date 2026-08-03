import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const createUserSchema = z.object({
  id: z.uuid().optional(), // Pode vir da Auth ou não!
  name: z.string().trim().min(2, "O nome deve ter no mínimo 2 caracteres.").max(100),
  email: z.email("E-mail inválido.").trim().toLowerCase(),
  role: userRoleZodSchema.default("CLIENT"),
  departmentId: z.string().uuid().nullable().optional(),
  avatarUrl: z.url().nullable().optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;