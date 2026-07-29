import { capitalizeFirstLetter } from "@/shared/utils/format-text";
import type { AtualizarDepartmentDto, DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { updateDepartmentUseCase } from "../use-cases/update-department.use-case";


export async function updateDepartmentHandler(
  dados: AtualizarDepartmentDto
): Promise<DepartmentRespostaDto> {
  const dadosNormalizados: AtualizarDepartmentDto = {
    id: dados.id.trim(),
    ...(dados.name?.trim() ? { name: capitalizeFirstLetter(dados.name.trim()) } : {}),
    ...(dados.description !== undefined ? { description: dados.description?.trim() } : {}),
  };

  const execute = updateDepartmentUseCase(repositorioDepartment);
  return execute(dadosNormalizados);
}