import type { IServiceRepository } from "../repositories/service-repository.interface";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export const getServiceByIdUseCase = (serviceRepository: IServiceRepository) => {
  return {
    execute: async (id: string): Promise<ServiceResponseDTO> => {
      const service = await serviceRepository.findById(id);

      if (!service) {
        throw new Error("Serviço não encontrado.");
      }

      return service;
    },
  };
};