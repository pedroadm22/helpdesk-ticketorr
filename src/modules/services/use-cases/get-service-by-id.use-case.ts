import { serviceRepository } from "../repositories/service.repository";

export async function getServiceByIdUseCase(id: string) {
  return await serviceRepository.findById(id);
}