// src/modules/dashboard/repositories/drizzle-dashboard.repository.ts
import { db } from "@/infrastructure/db";
import { tickets, departments, services } from "@/infrastructure/db/schema";
import { count, eq, sql } from "drizzle-orm";
import type { IDashboardRepository } from "./dashboard-repository.interface";
import type { DashboardMetricsDTO } from "../dtos/get-dashboard-metrics.dto";

export class DrizzleDashboardRepository implements IDashboardRepository {
  async getMetrics(): Promise<DashboardMetricsDTO> {
    try {
      // 1. Chamados em aberto (Trata status como texto direto se for enum)
      const [openTicketsResult] = await db
        .select({ count: count() })
        .from(tickets)
        .where(sql`${tickets.status}::text = 'OPEN'`);

      // 2. Total geral de chamados
      const [totalTicketsResult] = await db
        .select({ count: count() })
        .from(tickets);

      // 3. Total de departamentos
      const [totalDepartmentsResult] = await db
        .select({ count: count() })
        .from(departments);

      // 4. Total de serviços no catálogo
      const [totalServicesResult] = await db
        .select({ count: count() })
        .from(services);

      return {
        openTickets: Number(openTicketsResult?.count ?? 0),
        totalTickets: Number(totalTicketsResult?.count ?? 0),
        totalDepartments: Number(totalDepartmentsResult?.count ?? 0),
        totalServices: Number(totalServicesResult?.count ?? 0),
      };
    } catch (error) {
      console.error("Erro ao carregar métricas da dashboard:", error);
      // Retorna zeros em caso de inconsistência de tabela para não quebrar a tela inteira
      return {
        openTickets: 0,
        totalTickets: 0,
        totalDepartments: 0,
        totalServices: 0,
      };
    }
  }
}

export const dashboardRepository = new DrizzleDashboardRepository();