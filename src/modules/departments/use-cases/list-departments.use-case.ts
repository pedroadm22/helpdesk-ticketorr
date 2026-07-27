// src/modules/catalog/use-cases/list-departments.use-case.ts
import { departmentRepository } from "../repositories/department.repository";

export async function listDepartmentsUseCase() {
  return await departmentRepository.findAllWithServicesCount();
}