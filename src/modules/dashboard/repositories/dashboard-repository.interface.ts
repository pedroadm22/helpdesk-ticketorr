// src/modules/dashboard/repositories/dashboard-repository.interface.ts
import type { DashboardMetricsDTO } from "../dtos/get-dashboard-metrics.dto";

export interface IDashboardRepository {
  getMetrics(): Promise<DashboardMetricsDTO>;
}