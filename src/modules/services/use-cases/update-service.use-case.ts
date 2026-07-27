// src/modules/catalog/use-cases/update-service.use-case.ts
import { serviceRepository } from "../repositories/service.repository";
import { UpdateServiceInput } from "../dto/update-service.dto";

export async function updateServiceUseCase(id: string, data: UpdateServiceInput) {
  // Verifica se o serviço realmente existe antes de atualizar
  const serviceExists = await serviceRepository.findById(id);
  
  if (!serviceExists) {
    throw new Error("Serviço não encontrado.");
  }

  const updatedService = await serviceRepository.update(id, data);
  return updatedService;
}