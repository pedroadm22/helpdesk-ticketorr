import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ 
    message: "Insira um endereço de e-mail válido." 
  }),
  password: z.string().min(1, { 
    message: "A senha é obrigatória e deve ter pelo menos 6 caracteres." 
  }),
  confirmPassword: z.string().min(1, {
    message: "A confirmação de senha é obrigatória e deve ter pelo menos 6 caracteres."
  }),
});

export type LoginInputDto = z.infer<typeof loginSchema>;