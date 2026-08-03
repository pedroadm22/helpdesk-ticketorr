import type { IServiceRepository } from "../repositories/service-repository.interface";

export const deleteServiceUseCase = (serviceRepository: IServiceRepository) => {
  return {
    execute: async (id: string): Promise<void> => {
      const service = await serviceRepository.findById(id);

      if (!service) {
        throw new Error("Serviço não encontrado.");
      }

      await serviceRepository.delete(id);
    },
  };
};