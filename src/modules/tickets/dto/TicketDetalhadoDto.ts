import { TicketSelect, UserSelect } from "@/infrastructure/schema/ticket";

export interface TicketDetalhadoDto extends TicketSelect {
  // Injetamos os dados completos do usuário em vez de apenas os IDs soltos
  cliente: Omit<UserSelect, "dataCriacao">; 
  tecnico: Omit<UserSelect, "dataCriacao"> | null; // Pode ser nulo se não houver triagem
}