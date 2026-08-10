import { TicketMessage } from "@/shared/domain/types";
import { CreateTicketAttachmentDTO } from "./create-ticket-attachment.dto";

export type CreateTicketMessageDTO = Omit<
  TicketMessage,
  'id' | 'createdAt' | 'updatedAt' | 'attachments'
> & {
  // Anexos enviados junto com a mensagem (opcional)
  attachments?: CreateTicketAttachmentDTO[];
};