// src/modules/dashboard/use-cases/get-dashboard-metrics.use-case.ts
import { dashboardRepository } from "../repositories/drizzle-dashboard.repository";
import type { IDashboardRepository } from "../repositories/dashboard-repository.interface";
import type { DashboardMetricsDTO } from "../dtos/get-dashboard-metrics.dto";

export async function getDashboardMetricsUseCase(
  dashboardRepo: IDashboardRepository = dashboardRepository
): Promise<DashboardMetricsDTO> {
  return await dashboardRepo.getMetrics();
}