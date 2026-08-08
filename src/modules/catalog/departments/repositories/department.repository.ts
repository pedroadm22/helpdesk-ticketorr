import { Department } from '@/shared/domain/types/department.type';

export type DepartmentRepository = Readonly<{
  findById: (id: string) => Promise<Department | null>;
  findByName: (name: string) => Promise<Department | null>;
  save: (department: Department) => Promise<Department>;
  update: (department: Department) => Promise<Department>;
  delete: (id: string) => Promise<void>;
  findAll: (onlyActive?: boolean) => Promise<ReadonlyArray<Department>>;
}>;