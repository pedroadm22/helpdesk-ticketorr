import { db } from "@/infrastructure/db";
import { tickets, departments, services } from "@/infrastructure/db/schema";
import { count, eq } from "drizzle-orm";

export const dashboardRepository = {
  async getMetrics() {
    const [
      [totalTickets],
      [openTickets],
      [totalDepartments],
      [totalServices],
    ] = await Promise.all([
      db.select({ count: count() }).from(tickets),
      db.select({ count: count() }).from(tickets).where(eq(tickets.status, "WAITING_AGENT")),
      db.select({ count: count() }).from(departments),
      db.select({ count: count() }).from(services),
    ]);

    return {
      totalTickets: totalTickets?.count || 0,
      openTickets: openTickets?.count || 0,
      totalDepartments: totalDepartments?.count || 0,
      totalServices: totalServices?.count || 0,
    };
  },
};