import { Department } from '@/shared/domain/types/department.type';
import { Service } from '@/shared/domain/types/service.type';

// 1. DTO de Departamento enriquecido com a lista de Serviços dele
export type DepartmentWithServicesResponseDTO = Department & {
  services: Service[];
};

// 2. DTO da Árvore Completa do Catálogo (Array de Departamentos com Serviços)
export type CatalogTreeResponseDTO = DepartmentWithServicesResponseDTO[];