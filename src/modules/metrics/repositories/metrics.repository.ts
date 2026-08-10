import {
  FilterMetricsDTO,
  AgentDashboardMetricsResponseDTO,
  AdminDashboardMetricsResponseDTO,
} from '../dtos';

export interface IMetricsRepository {
  // Retorna métricas da fila individual de um técnico/agente
  getAgentDashboardMetrics(
    agentId: NonNullable<FilterMetricsDTO['assignedAgentId']>,
    filters?: FilterMetricsDTO
  ): Promise<AgentDashboardMetricsResponseDTO>;

  // Retorna os indicadores e agrupamentos globais (com byStatus usando Record<TicketStatus, number>)
  getAdminDashboardMetrics(
    filters?: FilterMetricsDTO
  ): Promise<AdminDashboardMetricsResponseDTO>;
}