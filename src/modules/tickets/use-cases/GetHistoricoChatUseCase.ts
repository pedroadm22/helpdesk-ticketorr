import { db } from "@/infrastructure/db";
import { mensagensChat, user } from "@/infrastructure/schemas/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

// Validação simples para garantir que o ID do chamado buscado é seguro
const GetHistoricoSchema = z.string().uuid();

export async function getHistoricoChatUseCase(ticketId: string) {
  const idValido = GetHistoricoSchema.parse(ticketId);

  // Busca as mensagens fazendo JOIN com a tabela de usuários para pegar o perfil e o nome
  const historico = await db
    .select({
      id: mensagensChat.id,
      conteudo: mensagensChat.conteudo,
      criadoEm: mensagensChat.criadoEm,
      remetente: {
        id: user.id,
        nome: user.name,
        perfil: user.role, // CLIENTE, TECNICO ou ADMIN
      },
    })
    .from(mensagensChat)
    .innerJoin(user, eq(mensagensChat.remetenteId, user.id))
    .where(eq(mensagensChat.ticketId, idValido))
    .orderBy(asc(mensagensChat.criadoEm)); // Mensagens antigas primeiro, as novas no fim

  return historico;
}