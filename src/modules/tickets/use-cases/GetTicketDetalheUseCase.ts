// src/modules/tickets/usecases/GetTicketDetalheUseCase.ts
import { db } from "@/infrastructure/db";
import { tickets, statusChamado, prioridadesChamado, users } from "@/infrastructure/schemas/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Validador simples para garantir que o ID recebido não está corrompido
const GetTicketDetalheInput = z.string().nonempty();

export async function getTicketDetalheUseCase(ticketId: string) {
  // 1. Valida o parâmetro de entrada
  const idValido = GetTicketDetalheInput.parse(ticketId);

  // 2. Executa a query relacionando as tabelas auxiliares
  const [resultado] = await db
    .select({
      id: tickets.id,
      protocolo: tickets.protocolo,
      titulo: tickets.titulo,
      descricao: tickets.descricao,
      dataLimiteSla: tickets.dataLimiteSla,
      dataCriacao: tickets.dataCriacao,
      status: statusChamado.nome,       // Pega o texto (ex: "Aberto")
      prioridade: prioridadesChamado.nome, // Pega o texto (ex: "Alta")
      cliente: {
        id: users.id,
        nome: users.nome,
      },
    })
    .from(tickets)
    .innerJoin(statusChamado, eq(tickets.statusId, statusChamado.id))
    .innerJoin(prioridadesChamado, eq(tickets.prioridadeId, prioridadesChamado.id))
    .innerJoin(users, eq(tickets.clienteId, users.id))
    .where(eq(tickets.id, idValido));

  // 3. Se o ID não existir no banco, dispara o erro que a nossa página vai capturar
  if (!resultado) {
    throw new Error("Chamado técnico não encontrado.");
  }

  return resultado;
}