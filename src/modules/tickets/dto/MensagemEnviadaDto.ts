import { z } from "zod";

export const EnviarMensagemSchema = z.object({
  // 🟢 CORRIGIDO: Passando a string direto dentro do .uuid()
  ticketId: z.string().uuid("O ID do ticket deve ser um UUID válido."),
  remetenteId: z.string().uuid("O ID do remetente deve ser um UUID válido."),
  
  conteudo: z.string().min(1, { message: "A mensagem não pode estar vazia." }).trim(),
});

export type EnviarMensagemDto = z.infer<typeof EnviarMensagemSchema>;