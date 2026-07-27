// src/modules/catalog/use-cases/create-service.use-case.ts
import { serviceRepository } from "../repositories/service.repository";
import { CreateServiceInput } from "../dto/create-service.dto";

export async function createServiceUseCase(data: CreateServiceInput) {
  // Aqui você pode adicionar regras de negócio, como validar se o nome já existe, etc.
  if (!data.name || !data.departmentId) {
    throw new Error("Nome e Departamento são obrigatórios para criar um serviço.");
  }

  const service = await serviceRepository.create(data);
  return service;
}