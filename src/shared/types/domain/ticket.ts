import { Usuario } from "./user";
import { Status } from "./status";
import { Prioridade } from "./prioridade";

export interface Ticket {
  id: string; // UUID
  protocolo: string; // Ex: TK-2026-001
  titulo: string;
  descricao: string;
  clienteId: string;
  tecnicoId: string | null; // Nulo até que um técnico assuma (Workflow)
  statusId: number;
  prioridadeId: number;
  tempoRestante?: string; // Ex: "12 min restantes" ou "Estourado há 5m"
  isEstourado?: boolean; // Indica se o tempo já estourou (para destaque visual)
  dataCriacao: Date;
  dataAtualizacao: Date;
  
  // Relacionamentos carregados opcionalmente (Joins / Includes)
  cliente?: Usuario;
  tecnico?: Usuario | null;
  status?: Status;
  prioridade?: Prioridade;
}