import { AgentDashboardMetrics } from '@/shared/domain/types/dashboard-metrics.type';
import { AdminDashboardMetrics } from '@/shared/domain/types/dashboard-metrics.type';

export type MetricsRepository = Readonly<{
  getAgentDashboardMetrics: (agentId: string) => Promise<AgentDashboardMetrics>;
  getAdminDashboardMetrics: () => Promise<AdminDashboardMetrics>;
}>;