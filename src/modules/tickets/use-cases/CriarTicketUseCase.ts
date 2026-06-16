// src/modules/tickets/use-cases/criarTicketUseCase.ts
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/schemas/schema";
import { count } from "drizzle-orm";
import { CriarTicketInputDto } from "../dto/CriarTicketDto";
import { v4 as uuidv4 } from "uuid"; // 🟢 Importamos o uuid para gerar o ID antes do insert

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
  // 1. Gera o ID do chamado antes do insert para contornar a limitação do SQLite
  const ticketId = uuidv4();

  // 2. Garante que o prioridadeId seja tratado como número (Garante o cálculo do SLA)
  const prioridadeIdNumero = Number(input.prioridadeId);

  // Gera o protocolo padrão fixo
  const protocolo = await gerarProtocoloPadrao();

  // Calcula o SLA do servidor baseado no número convertido
  const dataLimiteSla = calcularDataLimiteSla(prioridadeIdNumero);

  // 3. Insere lindamente compatível com SQLite
  await db
    .insert(tickets)
    .values({
      id: ticketId, // Injeta o ID gerado manualmente
      protocolo,
      titulo: input.titulo,
      descricao: input.descricao,
      prioridadeId: prioridadeIdNumero,
      statusId: 1, // Aberto
      clienteId: input.clienteId ?? "id-do-seu-cliente-do-seed",
      dataLimiteSla,
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    }); // ❌ Removeu o .returning() que quebrava o SQLite

  // 4. Retorna o ID gerado com segurança
  return ticketId;
}