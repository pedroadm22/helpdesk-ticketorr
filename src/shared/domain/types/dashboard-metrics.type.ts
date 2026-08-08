import { TicketStatus } from "./ticket-status.type";

// Métricas individuais da fila de trabalho do Agente
export type AgentDashboardMetrics = Readonly<{
  totalAssigned: number; // Chamados sob responsabilidade do técnico
  waitingAgentCount: number; // Status WAITING_AGENT
  nearSlaBreachCount: number; // Faltam menos de 2h para estourar o SLA
  resolvedThisMonthCount: number;
}>;

export type StatusMetricItem = Readonly<{
  status: TicketStatus;
  count: number;
}>;

export type DepartmentMetricItem = Readonly<{
  departmentId: string;
  departmentName: string;
  count: number;
}>;

// Métricas consolidadas do Gerente/Admin
export type AdminDashboardMetrics = Readonly<{
  totalTickets: number;
  unassignedCount: number; // Fila geral aguardando atribuição (OPEN)
  slaBreachedCount: number; // Chamados com SLA estourado

  // Agrupamentos para gráficos do painel
  byStatus: ReadonlyArray<StatusMetricItem>;
  byDepartment: ReadonlyArray<DepartmentMetricItem>;
}>;