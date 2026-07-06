// src/modules/tickets/use-cases/GetHistoricoChatUseCase.ts
import { db } from "@/infrastructure/db";
import { mensagensChat, user } from "@/infrastructure/schemas/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

// 🌟 CORREÇÃO 1: Removido o .uuid() para aceitar os novos formatos de ID do Better Auth
const GetHistoricoSchema = z.string();

export async function getHistoricoChatUseCase(ticketId: string) {
  const idValido = GetHistoricoSchema.parse(ticketId);

  // Busca as mensagens mapeando os campos para o formato do front-end
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
    // 🌟 CORREÇÃO 2: Mudado para leftJoin para evitar que a query quebre 
    // ou omita dados caso haja alguma inconsistência histórica de IDs no banco local
    .leftJoin(user, eq(mensagensChat.remetenteId, user.id))
    .where(eq(mensagensChat.ticketId, idValido))
    .orderBy(asc(mensagensChat.criadoEm));

  // Como usamos leftJoin, se o usuário não for encontrado, o Drizzle preenche o objeto remetente com null.
  // Vamos mapear os resultados para garantir que o front-end sempre receba dados válidos.
  return historico.map((msg) => ({
    id: msg.id,
    conteudo: msg.conteudo,
    criadoEm: msg.criadoEm,
    remetente: msg.remetente?.id ? {
      id: msg.remetente.id,
      nome: msg.remetente.nome || "Usuário Desconhecido",
      perfil: (msg.remetente.perfil as "CLIENTE" | "TECNICO" | "ADMIN") || "CLIENTE",
    } : {
      id: "sistema",
      nome: "Sistema/Ex-usuário",
      perfil: "ADMIN" as const,
    }
  }));
}