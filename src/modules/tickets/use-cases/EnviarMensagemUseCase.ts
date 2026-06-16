import { db } from "@/infrastructure/db";
import { mensagensChat } from "@/infrastructure/schemas/schema";
import { EnviarMensagemSchema, EnviarMensagemDto } from "@/modules/tickets/dto/MensagemEnviadaDto";
import { v4 as uuidv4 } from "uuid";

export async function enviarMensagemUseCase(input: EnviarMensagemDto) {
  // 1. Valida o DTO usando o Schema do Zod
  const dadosValidados = EnviarMensagemSchema.parse(input);

  const mensagemId = uuidv4();
  const agora = new Date();

  // 2. Insere na tabela mensagens_chat de forma compatível com SQLite
  await db.insert(mensagensChat).values({
    id: mensagemId,
    ticketId: dadosValidados.ticketId,
    remetenteId: dadosValidados.remetenteId,
    conteudo: dadosValidados.conteudo,
    criadoEm: agora,
  });

  // 3. Retorna o objeto completo estruturado (formato Select) para o Socket propagar
  return {
    id: mensagemId,
    ticketId: dadosValidados.ticketId,
    remetenteId: dadosValidados.remetenteId,
    conteudo: dadosValidados.conteudo,
    criadoEm: agora,
  };
}