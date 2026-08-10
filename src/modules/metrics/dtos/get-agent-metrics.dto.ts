import { GetDashboardMetricsDTO } from './get-dashboard-metrics.dto';

export type GetAgentMetricsDTO = Pick<GetDashboardMetricsDTO, 'startDate' | 'endDate'> & {
  agentId: string;
};