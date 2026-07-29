import type { CriarDepartmentDto, DepartmentRespostaDto } from "../dtos";
import { repositorioDepartment } from "../repositories/department.repository";
import { createDepartmentUseCase } from "../use-cases/create-department.use-case";

function capitalizarPrimeiraLetra(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

export async function criarDepartmentHandler(
  dados: CriarDepartmentDto
): Promise<DepartmentRespostaDto> {
  const dadosNormalizados: CriarDepartmentDto = {
    name: capitalizarPrimeiraLetra(dados.name.trim()),
    ...(dados.description?.trim() ? { description: dados.description.trim() } : {}),
  };

  const execute = createDepartmentUseCase(repositorioDepartment);
  return execute(dadosNormalizados);
}