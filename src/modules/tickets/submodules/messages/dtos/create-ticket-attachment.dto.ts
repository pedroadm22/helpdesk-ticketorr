import { TicketMessageAttachment } from "@/shared/domain/types/ticket-message.type";

export type CreateTicketAttachmentDTO = Omit<
  TicketMessageAttachment,
  'id' | 'messageId' | 'createdAt'
>;