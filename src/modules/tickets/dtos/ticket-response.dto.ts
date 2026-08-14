import { Department, Service, User } from '@/shared/domain/types';
import { Ticket } from '@/shared/domain/types/ticket.type';

// Resposta direta da entidade
export type TicketResponseDTO = Ticket;

// 2. Resposta com os relacionamentos aninhados (para a tela de atendimento)
export type TicketDetailsResponseDTO = Ticket & {
  service: Pick<Service, 'id' | 'name'>;
  department: Pick<Department, 'id' | 'name'>;
  client: Pick<User, 'id' | 'name' | 'email'>;
  assignedAgent?: Pick<User, 'id' | 'name' | 'email'> | null;
};