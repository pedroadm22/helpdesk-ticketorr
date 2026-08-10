import { TicketMessage } from "@/shared/domain/types";

export type UpdateTicketMessageDTO = Pick<TicketMessage, 'content'> & {
  messageId: string;
  authorId: string; // Para validação no UseCase se quem está editando é o dono
};