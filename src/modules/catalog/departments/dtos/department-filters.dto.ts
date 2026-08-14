import { Department } from "@/shared/domain/types/department.type";

export type DepartmentFiltersDTO = Partial<Pick<Department, 'isActive'>> & {
  categoryId?: string;
};