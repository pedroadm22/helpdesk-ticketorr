import type { DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { listDepartmentsUseCase } from "../use-cases/list-department.use-case";

export async function listDepartmentsHandler(): Promise<DepartmentRespostaDto[]> {
  const execute = listDepartmentsUseCase(repositorioDepartment);
  return execute();
}