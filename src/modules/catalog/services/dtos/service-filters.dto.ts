import { Service } from "@/shared/domain/types/service.type";

export type ServiceFiltersDTO = Partial<Pick<Service, 'isActive'>> & {
  departmentId?: string;
};