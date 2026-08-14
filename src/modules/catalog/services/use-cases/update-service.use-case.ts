import type { IServiceRepository } from "../repositories/service-repository.interface";
import type { UpdateServiceDTO } from "../dtos/update-service.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export const updateServiceUseCase = (serviceRepository: IServiceRepository) => {
  return {
    execute: async (dto: UpdateServiceDTO): Promise<ServiceResponseDTO> => {
      const service = await serviceRepository.findById(dto.id);

      if (!service) {
        throw new Error("Serviço não encontrado.");
      }

      if (dto.name && dto.name !== service.name) {
        const existingName = await serviceRepository.findByName(dto.name);
        if (existingName) {
          throw new Error("Já existe outro serviço cadastrado com este nome.");
        }
      }

      return await serviceRepository.update(dto);
    },
  };
};