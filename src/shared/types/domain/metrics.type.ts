export type TicketMetrics = {
  totalOpen: number;
  totalInProgress: number;
  totalResolved: number;
  avgResponseTimeInMinutes: number;
};

export type DepartmentStats = {
  departmentId: string;
  departmentName: string;
  totalTickets: number;
};