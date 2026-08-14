// src/core/domain/types/pagination.type.ts

// 1. O que ENTRA em qualquer consulta paginada
export type PaginationInput = {
  page: number;  // Ex: página 1, 2, 3...
  limit: number; // Ex: 10, 20, 50 itens por página
}

// 2. O que SAI de qualquer consulta paginada (Genérico <T>)
export type PaginatedOutput<T> = {
  data: T[];          
  total: number;      
  page: number;       
  limit: number;      
  totalPages: number;
}