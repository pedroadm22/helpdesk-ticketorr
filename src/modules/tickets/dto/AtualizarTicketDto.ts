import { TicketSelect } from "@/infrastructure/schema/ticket";

// Selecionamos as colunas mutáveis e envolvemos com Partial para torná-las opcionais
export type AtualizarTicketDto = Partial<
  Pick<TicketSelect, "statusId" | "prioridadeId" | "tecnicoId">
>;
