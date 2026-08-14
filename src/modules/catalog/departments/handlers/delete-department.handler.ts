import { repositorioDepartment } from "../repositories/department.repository";
import { deleteDepartmentUseCase } from "../use-cases/delete-department.use-case";

export async function removerDepartmentHandler(id: string): Promise<void> {
  const idNormalizado = id.trim();

  const execute = deleteDepartmentUseCase(repositorioDepartment);
  return execute(idNormalizado);
}