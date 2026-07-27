import { serviceRepository } from "../repositories/service.repository";

export async function listServicesUseCase() {
  return await serviceRepository.findAllWithDepartment();
}