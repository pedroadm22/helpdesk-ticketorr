// src/modules/tickets/use-cases/ListarTicketsUseCase.ts
import { db } from "@/infrastructure/db";
import { tickets, statusChamado, prioridadesChamado } from "@/infrastructure/schemas/schema";
import { eq, and, SQL } from "drizzle-orm";

interface ListarTicketsProps {
  usuarioId: string;
  role: "CLIENTE" | "TECNICO" | "ADMIN";
}

export async function listarTicketsUseCase({ usuarioId, role }: ListarTicketsProps) {
  // 1. Criamos um array de condições que começará vazio
  const condicoes: SQL[] = [];

  // 🌟 2. APLICAÇÃO DAS REGRAS DE NEGÓCIO PARA FILTRAGEM
  if (role === "CLIENTE") {
    // Cliente só vê o que ele mesmo abriu
    condicoes.push(eq(tickets.clienteId, usuarioId));
  } else if (role === "TECNICO") {
    // Técnico só vê o que está explicitamente atribuído a ele
    condicoes.push(eq(tickets.tecnicoId, usuarioId));
  }
  // Se for ADMIN, o array 'condicoes' continua vazio, trazendo absolutamente tudo!

  // 3. Executa a query trazendo os relacionamentos essenciais (Status e Prioridade)
  // para que a sua tabela na Dashboard não mostre apenas IDs brutos (ex: status_id = 1)
  const resultado = await db
    .select({
      id: tickets.id,
      protocolo: tickets.protocolo,
      titulo: tickets.titulo,
      descricao: tickets.descricao,
      dataCriacao: tickets.dataCriacao,
      dataLimiteSla: tickets.dataLimiteSla,
      status: statusChamado.name,
      prioridade: prioridadesChamado.name,
    })
    .from(tickets)
    .leftJoin(statusChamado, eq(tickets.statusId, statusChamado.id))
    .leftJoin(prioridadesChamado, eq(tickets.prioridadeId, prioridadesChamado.id))
    .where(condicoes.length > 0 ? and(...condicoes) : undefined);

  return resultado;
}