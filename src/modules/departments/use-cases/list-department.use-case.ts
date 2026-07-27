import {
  departmentRepository,
  DepartmentEntity,
} from "../repositories/department.repository";

export async function listDepartmentsUseCase(): Promise<DepartmentEntity[]> {
  // Retorna todos os departamentos diretamente pelo repositório
  const result = await departmentRepository.findAll();

  // Garante a ordenação alfabética pelo nome
  return result.sort((a, b) => a.name.localeCompare(b.name));
}