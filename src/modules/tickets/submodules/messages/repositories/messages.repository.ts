import { TicketMessage } from '@/shared/domain/types';
import { CreateTicketMessageDTO, FilterTicketMessagesDTO } from '../dtos';

export interface ITicketMessageRepository {
  findById(id: TicketMessage['id']): Promise<TicketMessage | null>;
  findManyByTicketId(filters: FilterTicketMessagesDTO): Promise<TicketMessage[]>;
  create(data: CreateTicketMessageDTO): Promise<TicketMessage>;
}