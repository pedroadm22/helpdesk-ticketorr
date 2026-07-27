import { z } from "zod";

export const EnviarMensagemSchema = z.object({
  ticketId: z.string().min(1, "O ID do chamado é obrigatório"),
  userId: z.string().min(1, "O ID do usuário é obrigatório"), // Atualizado para userId
  conteudo: z.string().min(1, "A mensagem não pode estar vazia"),
});

export type EnviarMensagemInput = z.infer<typeof EnviarMensagemSchema>;