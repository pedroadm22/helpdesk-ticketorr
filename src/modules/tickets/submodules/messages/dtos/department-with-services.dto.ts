import { ServiceResponseDTO } from "@/modules/catalog/services/dtos/service-response.dto";
import { Department } from "@/shared/domain/types/department.type";

export type DepartmentWithServicesResponseDTO = Department & {
  services: ServiceResponseDTO[];
};