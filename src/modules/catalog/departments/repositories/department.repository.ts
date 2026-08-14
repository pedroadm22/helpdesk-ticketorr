import { Department } from '@/shared/domain/types/department.type';
import {
  CreateDepartmentDTO,
  UpdateDepartmentDTO,
  DepartmentFiltersDTO,
} from '../dtos';

export interface IDepartmentRepository {
  findById(id: UpdateDepartmentDTO['id']): Promise<Department | null>;
  findMany(filters?: DepartmentFiltersDTO): Promise<Department[]>;
  create(data: CreateDepartmentDTO): Promise<Department>;
  update(data: UpdateDepartmentDTO): Promise<Department>;
  delete(id: UpdateDepartmentDTO['id']): Promise<void>;
}