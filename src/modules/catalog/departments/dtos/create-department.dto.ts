import { Department } from "@/shared/domain/types/department.type";

export type CreateDepartmentDTO = Omit<Department, 'id' | 'createdAt' | 'updatedAt'>;