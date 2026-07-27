import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "O e-mail é obrigatório." })
    .email({ message: "Insira um endereço de e-mail válido." }),
  
  password: z
    .string()
    .min(1, { message: "A senha é obrigatória." }), // No login só precisamos saber se a senha foi preenchida
});

export type LoginInputDto = z.infer<typeof loginSchema>;