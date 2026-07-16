import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { 
    message: "O nome deve conter pelo menos 2 caracteres." 
  }),
  email: z.string().email({ 
    message: "Insira um endereço de e-mail válido." 
  }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número." }),
});

export type RegisterInput = z.infer<typeof registerSchema>;