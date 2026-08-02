import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const createUserSchema = z.object({
  id: z.string().uuid().optional(), // Permite passar o ID gerado pelo Supabase Auth/Provedor
  name: z.string().trim().min(2, "O nome deve ter no mínimo 2 caracteres.").max(100),
  email: z.string().trim().email("E-mail inválido.").toLowerCase(),
  role: userRoleZodSchema.default("CLIENT"),
  departmentId: z.string().uuid("ID do departamento inválido.").nullable().optional(),
  avatarUrl: z.string().url().nullable().optional(),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;