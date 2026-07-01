import { z } from "zod";

export const EnviarMensagemSchema = z.object({
  ticketId: z.string(), // Deixe apenas string se o ticket não for UUID
  remetenteId: z.string(), // 🌟 Mudado de .uuid() para apenas .string()
  conteudo: z.string().min(1),
});

export type EnviarMensagemDto = z.infer<typeof EnviarMensagemSchema>;