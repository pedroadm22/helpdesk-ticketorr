export interface TicketFilaItemDto {
  id: string;
  protocolo: string;
  titulo: string;
  clienteNome: string; // Nome vindo da tabela de Usuários
  statusId: number;    // 1: Aberto, 2: Em Atendimento, 3: Pendente, 4: Resolvido
  dataCriacao: string; // String já formatada, ex: "12/06/2026"
}

// O DTO é simplesmente um array desses itens
export type ListaFilaTicketsDto = TicketFilaItemDto[];