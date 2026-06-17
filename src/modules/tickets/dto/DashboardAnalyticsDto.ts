import { UrgentTicketItemDto } from "./UrgentTicketDto";

export interface DashboardAnalyticsDto {
  totalChamados: number;
  tempoMedioAtendimento: string;
  siasEstourados: number;
  taxaSatisfacao: string;
  ticketsUrgentes: UrgentTicketItemDto[]; // A lista de chamados que alimenta a lateral e o topo
}