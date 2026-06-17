export interface UrgentTicketItemDto {
  id: string;
  protocolo: string;
  titulo: string;
  tempoRestante: string; // Ex: "12 min restantes" ou "Estourado há 5m"
  isEstourado: boolean;  // Define se o card fica vermelho ou amarelo
}