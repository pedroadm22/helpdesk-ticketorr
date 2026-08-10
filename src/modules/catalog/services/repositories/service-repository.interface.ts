import { Service } from '@/shared/domain/types';
import {
  CreateServiceDTO,
  UpdateServiceDTO,
  ServiceFiltersDTO,
  CatalogTreeResponseDTO,
} from '../dtos';

export interface IServiceRepository {
  findById(id: UpdateServiceDTO['id']): Promise<Service | null>;
  findManyByDepartmentId(departmentId: CreateServiceDTO['departmentId']): Promise<Service[]>;
  findMany(filters?: ServiceFiltersDTO): Promise<Service[]>;
  create(data: CreateServiceDTO): Promise<Service>;
  update(data: UpdateServiceDTO): Promise<Service>;
  delete(id: UpdateServiceDTO['id']): Promise<void>;
  
  getCatalogTree(): Promise<CatalogTreeResponseDTO>;
}