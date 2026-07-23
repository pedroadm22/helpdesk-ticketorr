import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ 
    message: "Insira um endereço de e-mail válido." 
  }),
  password: z.string().min(1, { 
    message: "A senha é obrigatória." 
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;