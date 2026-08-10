import {
  AdminDashboardMetrics,
  AgentDashboardMetrics,
  DepartmentMetricItem,
  StatusMetricItem,
} from '@/shared/domain/types/dashboard-metrics.type';

// DTO de resposta para o Painel Geral (Visão de Admin / Gerente)
export type AdminDashboardMetricsResponseDTO = AdminDashboardMetrics;

// DTO de resposta para o Painel Individual do Agente/Técnico
export type AgentDashboardMetricsResponseDTO = AgentDashboardMetrics;

// Reexportação dos itens agregados (para respostas de endpoints que retornam gráficos isolados)
export type StatusMetricItemResponseDTO = StatusMetricItem;
export type DepartmentMetricItemResponseDTO = DepartmentMetricItem;