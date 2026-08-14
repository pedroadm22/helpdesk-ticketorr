import {
  atualizarDepartmentSchema,
  type AtualizarDepartmentDto,
  type DepartmentRespostaDto,
} from "../dtos";
import type { RepositorioDepartment } from "../repositories/department.repository";

export const updateDepartmentUseCase = (repositorio: RepositorioDepartment) => {
  return async (dados: AtualizarDepartmentDto): Promise<DepartmentRespostaDto> => {
    // 1. Validação dos dados
    const dadosValidados = atualizarDepartmentSchema.parse(dados);

    // 2. Verifica se o departamento existe
    const existe = await repositorio.buscarPorId(dadosValidados.id);
    if (!existe) {
      throw new Error("Departamento não encontrado para atualização.");
    }

    // 3. Executa a atualização
    return await repositorio.atualizar(dadosValidados);
  };
};