import { TicketMessage } from "@/shared/domain/types";

export type FilterTicketMessagesDTO = {
  ticketId: TicketMessage['ticketId'];
  includeInternal?: TicketMessage['isInternal'];
  page?: number;
  limit?: number;
};