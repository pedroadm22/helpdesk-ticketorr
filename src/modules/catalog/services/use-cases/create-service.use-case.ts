import type { IServiceRepository } from "../repositories/service-repository.interface";
import type { CreateServiceDTO } from "../dtos/create-service.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export const createServiceUseCase = (serviceRepository: IServiceRepository) => {
  return {
    execute: async (dto: CreateServiceDTO): Promise<ServiceResponseDTO> => {
      const existingService = await serviceRepository.findByName(dto.name);

      if (existingService) {
        throw new Error("Já existe um serviço cadastrado com este nome.");
      }

      return await serviceRepository.create(dto);
    },
  };
};