// src/modules/tickets/use-cases/CriarTicketUseCase.ts
import { db } from "@/infrastructure/db";
import { tickets, statusChamado } from "@/infrastructure/schemas/schema";
import { eq } from "drizzle-orm";
import { CriarTicketOutputDTO, criarTicketSchema } from "../dto/CriarTicketDto";

export class CriarTicketUseCase {
  // Passamos o DTO validado como o tipo do argumento de entrada
  async execute(input: CriarTicketOutputDTO) {
    
    // 1. Buscar o ID do status 'Aguardando Triagem' dinamicamente no banco
    const statusTriagem = await db
      .select()
      .from(statusChamado)
      .where(eq(statusChamado.name, "Aguardando Triagem"))
      .get();

    if (!statusTriagem) {
      throw new Error("Status inicial 'Aguardando Triagem' não foi configurado no banco.");
    }

    // 2. Salvar o novo ticket usando o DTO purificado com padrão snake_case do Drizzle
    await db.insert(tickets).values({
      id: input.id, // Já gerado de forma segura pelo padrão do Zod!
      titulo: input.titulo,
      descricao: input.descricao,
      statusId: statusTriagem.id,
      prioridadeId: input.prioridadeId,
      setorId: input.setorId,
      servicoId: input.servicoId,
      clienteId: input.clienteId,
      adminId: null,
      tecnicoId: null,
    });

    return { ticketId: input.id };
  }
}