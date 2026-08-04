// src/modules/catalog/services/dtos/list-services-filter.dto.ts
export interface ListServicesFilterDTO {
  search?: string;
  departmentId?: string;
  isActive?: boolean;
  page?: number;
  limit?: number; 
}
