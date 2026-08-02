// src/modules/auth/dtos/login-submit.dto.ts
import { z } from "zod";

export const loginSubmitSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .toLowerCase(),
  password: z
    .string()
    .min(1, "A senha é obrigatória."),
});

export type LoginSubmitDTO = z.infer<typeof loginSubmitSchema>;