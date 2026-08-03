import { z } from "zod";

export const resetPasswordSchema = z.object({
  code: z.string().min(1, "Código/Token de redefinição inválido."),
  newPassword: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres."),
});

export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;