import type { CreateServiceDTO } from "../dtos/create-service.dto";
import type { UpdateServiceDTO } from "../dtos/update-service.dto";
import type { ListServicesFilterDTO } from "../dtos/list-services-filter.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export interface IServiceRepository {
  create(dto: CreateServiceDTO): Promise<ServiceResponseDTO>;
  update(dto: UpdateServiceDTO): Promise<ServiceResponseDTO>;
  findById(id: string): Promise<ServiceResponseDTO | null>;
  findByName(name: string): Promise<ServiceResponseDTO | null>;
  list(filter: ListServicesFilterDTO): Promise<{ data: ServiceResponseDTO[]; total: number }>;
  delete(id: string): Promise<void>;
}