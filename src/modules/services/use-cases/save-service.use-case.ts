import { serviceRepository } from "../repositories/service.repository";

interface SaveServiceInput {
  id?: string;
  name: string;
  description?: string | null;
  departmentId: string;
}

export async function saveServiceUseCase(data: SaveServiceInput) {
  if (!data.name.trim()) {
    throw new Error("O nome do serviço é obrigatório.");
  }

  if (!data.departmentId) {
    throw new Error("Selecione um departamento responsável.");
  }

  return await serviceRepository.save(data);
}