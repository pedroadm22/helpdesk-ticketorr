import { deletarDepartmentSchema } from "../dtos";
import type { RepositorioDepartment } from "../repositories/department.repository";

export const deleteDepartmentUseCase = (repositorio: RepositorioDepartment) => {
  return async (id: string): Promise<void> => {
    // 1. Valida se o ID enviado é válido
    const { id: idValidado } = deletarDepartmentSchema.parse({ id });

    // 2. Garante a existência antes de deletar
    const existe = await repositorio.buscarPorId(idValidado);
    if (!existe) {
      throw new Error("Departamento não encontrado para remoção.");
    }

    // 3. Remove do banco
    await repositorio.remover(idValidado);
  };
};