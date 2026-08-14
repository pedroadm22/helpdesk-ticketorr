import { TicketFilters } from '@/shared/domain/types/ticket-filters.type';

export type FilterMetricsDTO = Pick<
  TicketFilters,
  'startDate' | 'endDate' | 'departmentId' | 'serviceId' | 'assignedAgentId'
>;