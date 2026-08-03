import type { IServiceRepository } from "../repositories/service-repository.interface";
import type { ListServicesFilterDTO } from "../dtos/list-services-filter.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export const listServicesUseCase = (serviceRepository: IServiceRepository) => {
  return {
    execute: async (
      filter: ListServicesFilterDTO
    ): Promise<{ data: ServiceResponseDTO[]; total: number }> => {
      return await serviceRepository.list(filter);
    },
  };
};