// src/modules/tickets/use-cases/GetHistoricoChatUseCase.ts
import { db } from "@/infrastructure/db";
import { mensagensChat, user } from "@/infrastructure/schemas/schema";
import { eq, asc } from "drizzle-orm";
import { z } from "zod";

const GetHistoricoSchema = z.string();

export async function getHistoricoChatUseCase(ticketId: string) {
  const idValido = GetHistoricoSchema.parse(ticketId);

  // Busca as mensagens mapeando os campos usando estritamente o padrão name/role
  const historico = await db
    .select({
      id: mensagensChat.id,
      conteudo: mensagensChat.conteudo,
      criadoEm: mensagensChat.criadoEm,
      remetente: {
        id: user.id,
        name: user.name,
        role: user.role, // 🌟 Mudado de perfil para role na seleção do Drizzle
      },
    })
    .from(mensagensChat)
    .leftJoin(user, eq(mensagensChat.remetenteId, user.id))
    .where(eq(mensagensChat.ticketId, idValido))
    .orderBy(asc(mensagensChat.criadoEm));

  // Mapeia o resultado limpando as propriedades para o contrato do Front-end
  return historico.map((msg) => ({
    id: msg.id,
    conteudo: msg.conteudo,
    // 🌟 CONVERSÃO AQUI: Garante que o Date do banco vire uma String ISO
    criadoEm:
      msg.criadoEm instanceof Date
        ? msg.criadoEm.toISOString()
        : String(msg.criadoEm),
    remetente: msg.remetente?.id
      ? {
          id: msg.remetente.id,
          name: msg.remetente.name || "Usuário Desconhecido",
          role:
            (msg.remetente.role as "CLIENTE" | "TECNICO" | "ADMIN") ||
            "CLIENTE",
        }
      : {
          id: "sistema",
          name: "Sistema",
          role: "ADMIN" as const,
        },
  }));
}