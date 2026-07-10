// src/modules/tickets/use-cases/GetTicketDetalheUseCase.ts
import { db } from "@/infrastructure/db"; 
import { tickets, statusChamado, prioridadesChamado, user } from "@/infrastructure/schemas/schema"; 
import { eq } from "drizzle-orm";

interface GetTicketProps {
  ticketId: string;
  usuarioId: string;
  role: "CLIENTE" | "TECNICO" | "ADMIN";
}

export async function getTicketDetalheUseCase({ ticketId, usuarioId, role }: GetTicketProps) {
  // 🌟 Fazemos a busca trazendo os dados das tabelas relacionadas
  const [resultado] = await db
    .select({
      id: tickets.id,
      protocolo: tickets.protocolo,
      titulo: tickets.titulo,
      descricao: tickets.descricao,
      clienteId: tickets.clienteId,
      tecnicoId: tickets.tecnicoId,
      // Mapeamos os nomes em formato de string limpa para a UI
      status: statusChamado.name,
      prioridade: prioridadesChamado.name,
      // Criamos um objeto para o cliente para manter o contrato 'ticket.cliente.name'
      cliente: {
        name: user.name,
      }
    })
    .from(tickets)
    .innerJoin(statusChamado, eq(tickets.statusId, statusChamado.id))
    .innerJoin(prioridadesChamado, eq(tickets.prioridadeId, prioridadesChamado.id))
    .innerJoin(user, eq(tickets.clienteId, user.id)) // Traz o usuário que abriu o chamado
    .where(eq(tickets.id, ticketId))
    .limit(1);

  // Se não encontrar o registro, mata a execução
  if (!resultado) {
    return null;
  }

  // 🔒 APLICAÇÃO DAS REGRAS DE NEGÓCIO (RBAC)
  if (role === "CLIENTE" && resultado.clienteId !== usuarioId) {
  return null; 
}

// 2. Se for TÉCNICO, ele vê se for o responsável OU se ele mesmo abriu o chamado
if (role === "TECNICO") {
  const ehOResponsavel = resultado.tecnicoId === usuarioId;
  const ehOAutorDoChamado = resultado.clienteId === usuarioId;

  if (!ehOResponsavel && !ehOAutorDoChamado) {
    console.warn(`[SEGURANÇA] Técnico ${usuarioId} tentou acessar chamado não vinculado.`);
    return null; // Bloqueia apenas se ele não for nem o técnico e nem o autor
  }
}

  return resultado;
}