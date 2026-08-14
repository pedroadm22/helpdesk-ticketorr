// src/modules/catalog/actions/get-services-by-department.action.ts
"use server";

import { listServicesByDepartmentUseCase } from "@/modules/services/use-cases/list-service-by-department.use-case";

export async function getServicesByDepartmentAction(departmentId: string) {
  try {
    const services = await listServicesByDepartmentUseCase(departmentId);
    return { success: true, services };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro ao carregar serviços." };
  }
}