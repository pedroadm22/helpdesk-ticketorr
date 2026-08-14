import {
  criarDepartmentSchema,
  type CriarDepartmentDto,
  type DepartmentRespostaDto,
} from "../dtos";
import type { RepositorioDepartment } from "../repositories/department.repository";

export const createDepartmentUseCase = (repositorio: RepositorioDepartment) => {
  return async (dados: CriarDepartmentDto): Promise<DepartmentRespostaDto> => {
    // 1. Validação em runtime via Zod
    const dadosValidados = criarDepartmentSchema.parse(dados);

    // 2. Persistência no repositório
    return await repositorio.salvar(dadosValidados);
  };
};