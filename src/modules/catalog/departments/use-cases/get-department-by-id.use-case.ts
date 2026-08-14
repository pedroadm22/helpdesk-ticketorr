import { deletarDepartmentSchema, type DepartmentRespostaDto } from "../dtos";
import type { RepositorioDepartment } from "../repositories/department.repository";

export const getDepartmentByIdUseCase = (repositorio: RepositorioDepartment) => {
  return async (id: string): Promise<DepartmentRespostaDto> => {
    // Valida se o ID informado é um UUID válido
    deletarDepartmentSchema.parse({ id });

    const department = await repositorio.buscarPorId(id);

    if (!department) {
      throw new Error("Departamento não encontrado.");
    }

    return department;
  };
};