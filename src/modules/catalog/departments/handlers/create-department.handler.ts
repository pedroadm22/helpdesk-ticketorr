import { capitalizeFirstLetter } from "@/shared/utils/format-text";
import type { CriarDepartmentDto, DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { createDepartmentUseCase } from "../use-cases/create-department.use-case";


export async function createDepartmentHandler(
  dados: CriarDepartmentDto
): Promise<DepartmentRespostaDto> {
  const dadosNormalizados: CriarDepartmentDto = {
    name: capitalizeFirstLetter(dados.name.trim()),
    ...(dados.description?.trim() ? { description: dados.description.trim() } : {}),
  };

  const execute = createDepartmentUseCase(repositorioDepartment);
  return execute(dadosNormalizados);
}