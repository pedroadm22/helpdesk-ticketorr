import {
  serviceRepository,
  ServiceEntity,
} from "../repositories/service.repository";

export async function listServicesByDepartmentUseCase(
  departmentId: string
): Promise<ServiceEntity[]> {
  // 1. Validação básica de entrada
  if (!departmentId) {
    throw new Error("O ID do departamento é obrigatório para listar os serviços.");
  }

  // 2. Busca via repositório funcional
  const result = await serviceRepository.findByDepartmentId(departmentId);

  return result;
}