// Adicione no seu arquivo de use-cases de departamento:
import { departmentRepository } from "../repositories/department.repository";

export async function getDepartmentByIdUseCase(id: string) {
  return await departmentRepository.findById(id);
}