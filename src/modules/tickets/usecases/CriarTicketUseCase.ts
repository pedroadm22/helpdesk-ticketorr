import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/schema/ticket";
import { count } from "drizzle-orm";
import { CriarTicketInputDto } from "../dto/CriarTicketDto";

// Helper para calcular as horas de SLA
function calcularDataLimiteSla(prioridadeId: number): Date {
  const agora = new Date();
  const horasSlaMap: Record<number, number> = {
    1: 48, // Baixa: 48h
    2: 24, // Média: 24h
    3: 8,  // Alta: 8h
    4: 2,  // Crítica: 2h
  };

  const horasParaAdicionar = horasSlaMap[prioridadeId] || 24;
  agora.setHours(agora.getHours() + horasParaAdicionar);
  return agora;
}

// Helper direto e sem rodeios para o padrão TK-2026-001
async function gerarProtocoloPadrao(): Promise<string> {
  const anoAtual = new Date().getFullYear();

  // Conta o total de chamados para incrementar o próximo
  const [resultado] = await db.select({ total: count() }).from(tickets);
  
  const proximoNumero = (resultado?.total ?? 0) + 1;
  const numeroFormatado = String(proximoNumero).padStart(3, "0");

  return `TK-${anoAtual}-${numeroFormatado}`;
}

export async function criarTicketUseCase(input: CriarTicketInputDto): Promise<string> {
  // Gera o protocolo padrão fixo
  const protocolo = await gerarProtocoloPadrao();

  // Calcula o SLA do servidor
  const dataLimiteSla = calcularDataLimiteSla(input.prioridadeId);

  // Insere lindamente sem erros de tipagem
  const [ticketCriado] = await db
    .insert(tickets)
    .values({
      protocolo,
      titulo: input.titulo,
      descricao: input.descricao,
      prioridadeId: input.prioridadeId,
      statusId: 1, // Aberto
      clienteId: input.clienteId ?? "id-do-seu-cliente-do-seed",
      dataLimiteSla,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    })
    .returning({ id: tickets.id });

  return ticketCriado.id;
}