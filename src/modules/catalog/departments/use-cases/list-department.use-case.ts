import type { DepartmentRespostaDto } from "../dtos";
import type { RepositorioDepartment } from "../repositories/department.repository";

export const listDepartmentsUseCase = (repositorio: RepositorioDepartment) => {
  return async (): Promise<DepartmentRespostaDto[]> => {
    return await repositorio.buscarTodos();
  };
};