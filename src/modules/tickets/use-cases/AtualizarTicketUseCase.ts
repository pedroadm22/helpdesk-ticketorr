// src/modules/tickets/use-cases/AtualizarTicketUseCase.ts
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/schemas/schema";
import { eq } from "drizzle-orm";
import { AtualizarTicketInput, AtualizarTicketSchema } from "../dto/AtualizarTicketDto";

export async function atualizarTicketUseCase(payload: AtualizarTicketInput) {
  // 1. Valida o payload de entrada contra o DTO
  const dadosValidados = AtualizarTicketSchema.parse(payload);

  // 2. Separa o ID do resto dos dados para a query
  const { id, ...camposParaAtualizar } = dadosValidados;

  // 3. Executa a atualização no banco de dados SQLite
  const [ticketAtualizado] = await db
    .update(tickets)
    .set({
      ...camposParaAtualizar,
      // Atualiza o timestamp de modificação em milissegundos nativos
      dataAtualizacao: new Date(), 
    })
    .where(eq(tickets.id, id))
    .returning();

  if (!ticketAtualizado) {
    throw new Error("Ticket não encontrado para atualização.");
  }

  return ticketAtualizado;
}