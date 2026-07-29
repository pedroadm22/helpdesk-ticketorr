import type { AtualizarDepartmentDto, DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { updateDepartmentUseCase } from "../use-cases/update-department.use-case";

function capitalizarPrimeiraLetra(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export async function atualizarDepartmentHandler(
  dados: AtualizarDepartmentDto
): Promise<DepartmentRespostaDto> {
  const dadosNormalizados: AtualizarDepartmentDto = {
    id: dados.id.trim(),
    ...(dados.name?.trim() ? { name: capitalizarPrimeiraLetra(dados.name.trim()) } : {}),
    ...(dados.description !== undefined ? { description: dados.description?.trim() } : {}),
  };

  const execute = updateDepartmentUseCase(repositorioDepartment);
  return execute(dadosNormalizados);
}