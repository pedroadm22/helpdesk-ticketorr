// src/modules/auth/dtos/register-user.dto.ts
import { z } from "zod";
import { userRoleZodSchema } from "@/shared/types/domain/zod.types";

export const registerUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "O nome deve ter no mínimo 2 caracteres.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .toLowerCase(),
  password: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres."),
  role: userRoleZodSchema.default("ADMIN"),
  departmentId: z.string().uuid("ID do departamento inválido.").nullable().optional(),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;