import { Department } from "@/shared/domain/types/department.type";

export type FilterCatalogDTO = Partial<Pick<Department, 'isActive'>> & {
  categoryId?: string;
};