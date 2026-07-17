import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { CloseTicketInput, CloseTicketSchema } from "../dto/CloseTicketDto";

// 🌟 Inferindo o tipo de retorno diretamente da tabela do Drizzle
type Ticket = typeof tickets.$inferSelect;

export class CloseTicketUseCase {
  async execute(input: CloseTicketInput): Promise<Ticket> {
    // 1. Valida a entrada em runtime com o Zod
    const validatedData = CloseTicketSchema.parse(input);

    const now = new Date();

    // 2. Executa a atualização do status diretamente no SQLite/Turso
    const [closedTicket] = await db
      .update(tickets)
      .set({
        status: "CLOSED",
        updatedAt: now, // O Drizzle converte o Date para o integer timestamp do SQLite
      })
      .where(eq(tickets.id, validatedData.ticketId))
      .returning();

    // 3. Defesa: Se o ID não bateu com nenhum registro, avisa o sistema
    if (!closedTicket) {
      throw new Error("Ticket não encontrado para encerramento.");
    }

    // 4. Retorna o registro do ticket atualizado
    return closedTicket;
  }
}