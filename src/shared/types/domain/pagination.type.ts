import { TicketStatus, TicketPriority } from "./zod.types";

// Parâmetros genéricos para requisições de listagem


export type PaginationParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

// Resposta envelope contendo dados + metadados de paginação
export type PaginatedResult<T> = {
  items: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

// Filtro específico para a listagem de tickets no dashboard
export type TicketFilters = PaginationParams & {
  status?: TicketStatus[];
  priority?: TicketPriority[];
  departmentId?: string;
  assignedAgentId?: string;
  customerId?: string;
};