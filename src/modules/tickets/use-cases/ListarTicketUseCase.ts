import { db } from "@/infrastructure/db";
import { tickets, statusChamado, prioridadesChamado } from "@/infrastructure/schemas/schema";
import { eq, and, or, isNull, SQL } from "drizzle-orm"; // 🌟 Importe 'or' e 'isNull'
import { UserRole } from "@/shared/types/domain/user";

interface ListarTicketsProps {
  usuarioId: string;
  role: UserRole;
}

export async function listarTicketsUseCase({ usuarioId, role }: ListarTicketsProps) {
  const condicoes: SQL[] = [];

  if (role === "CLIENTE") {
    condicoes.push(eq(tickets.clienteId, usuarioId));
  } 
  else if (role === "TECNICO") {
    // 🌟 ALTERAÇÃO AQUI: Técnico vê o que é DELE ou o que está SEM TÉCNICO (fila de triagem)
    condicoes.push(
      or(
        eq(tickets.tecnicoId, usuarioId),
        isNull(tickets.tecnicoId)
      ) as SQL
    );
  }

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