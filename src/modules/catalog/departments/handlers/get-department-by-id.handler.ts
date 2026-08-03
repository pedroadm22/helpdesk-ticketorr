import type { DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { getDepartmentByIdUseCase } from "../use-cases/get-department-by-id.use-case"

export async function buscarDepartmentPorIdHandler(
  id: string
): Promise<DepartmentRespostaDto> {
  const idNormalizado = id.trim();

  const execute = getDepartmentByIdUseCase(repositorioDepartment);
  return execute(idNormalizado);
}