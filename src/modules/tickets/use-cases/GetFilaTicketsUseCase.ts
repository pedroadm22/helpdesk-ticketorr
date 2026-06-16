import { db } from "@/infrastructure/db";
import { tickets, users } from "@/infrastructure/schemas/schema";
import { desc, eq } from "drizzle-orm";
import { ListaFilaTicketsDto } from "../dto/ListaFilaTicketsDto";

export async function getFilaTicketsUseCase(): Promise<ListaFilaTicketsDto> {
  // 1. Buscamos apenas as colunas necessárias direto do banco de dados (Query Otimizada)
  const resultadoBanco = await db
    .select({
      id: tickets.id,
      protocolo: tickets.protocolo,
      titulo: tickets.titulo,
      statusId: tickets.statusId,
      dataCriacao: tickets.dataCriacao,
      clienteNome: users.nome, // Capturado através do relacionamento de tabelas
    })
    .from(tickets)
    .leftJoin(users, eq(tickets.clienteId, users.id)) // Une a tabela de tickets com a de usuários
    .orderBy(desc(tickets.dataCriacao)); // Ordena sempre do mais recente para o mais antigo

  // 2. Mapeamos os dados brutos do banco para o formato exato exigido pelo DTO
  return resultadoBanco.map((item) => ({
    id: item.id,
    protocolo: item.protocolo,
    titulo: item.titulo,
    statusId: item.statusId,
    // Tratamos dados complexos como nomes nulos e formatação de data no próprio servidor
    clienteNome: item.clienteNome ?? "Cliente Geral",
    dataCriacao: new Date(item.dataCriacao).toLocaleDateString("pt-BR"),
  }));
}