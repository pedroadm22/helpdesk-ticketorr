export interface Ticket {
  id: string;
  title: string;
  description: string;
  statusId: string;
  priorityId: string;
  departmentId: string;
  serviceId: string;
  clientId: string;
  technicianId: string | null;
  adminId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 💡 Dica de Ouro: Entidade de Detalhe para o Front-end (Com relacionamentos populados)
export interface TicketDetails extends Ticket {
  statusName: string;
  priorityName: string;
  departmentName: string;
  serviceName: string;
  clientName: string;
  technicianName: string | null;
}