import { Ticket } from '@/shared/domain/types/ticket.type';

export type GetDashboardMetricsDTO = Partial<
  Pick<Ticket, 'departmentId' | 'serviceId' | 'assignedAgentId'>
> & {
  startDate: Date;
  endDate: Date;
};