export type TicketStatus =
  | "OPEN"              // Recém-criado, na fila de triagem
  | "WAITING_SUPPORT"   // Na fila do departamento
  | "VIEWED"            // Visualizado por um técnico
  | "WAITING_CLIENT"    // Aguardando ação do cliente
  | "WAITING_AGENT"     // Aguardando resposta do técnico
  | "RESOLVED"          // Marcado como resolvido
  | "CLOSED";           // Finalizado definitivamente

export type TicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type Ticket = Readonly<{
  id: string;
  code: string;               // Ex: #1024
  title: string;
  description: string;
  departmentId: string;
  serviceId: string;
  clientId: string;
  assignedAgentId: string | null;
  customCategory: string | null;
  status: TicketStatus;
  priority: TicketPriority;
  slaDueDate: Date;           // Data/Hora limite calculada pelo SLA do serviço
  resolvedAt: Date | null;
  closedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}>;