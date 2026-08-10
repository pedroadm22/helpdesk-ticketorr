import { TicketStatus } from './ticket-status.type';
import { Department } from './department.type';

// Métricas individuais da fila de trabalho do Agente
export type AgentDashboardMetrics = Readonly<{
  totalAssigned: number;
  waitingAgentCount: number;
  nearSlaBreachCount: number;
  resolvedThisMonthCount: number;
}>;

export type StatusMetricItem = Readonly<{
  status: TicketStatus;
  count: number;
}>;

// Deriva id e name diretamente da entidade Department
export type DepartmentMetricItem = Readonly<
  Pick<Department, 'id' | 'name'> & {
    count: number;
  }
>;

// Métricas consolidadas do Gerente/Admin
export type AdminDashboardMetrics = Readonly<{
  totalTickets: number;
  unassignedCount: number;
  slaBreachedCount: number;

  // Agrupamentos para gráficos do painel
  byStatus: ReadonlyArray<StatusMetricItem>;
  byDepartment: ReadonlyArray<DepartmentMetricItem>;
}>;