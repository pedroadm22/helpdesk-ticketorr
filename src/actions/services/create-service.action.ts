import { createServiceUseCase } from '@/modules/catalog/services/use-cases/create-service.use-case';

import { revalidatePath } from "next/cache";

export async function createServiceAction(data: {
  name: string;
  departmentId: string;
  description?: string;
}) {
  try {
    const service = await createServiceUseCase(data);
    revalidatePath("/dashboard/admin");
    return { success: true, service };
  } catch (error: any) {
    return { success: false, error: error.message || "Erro ao criar serviço." };
  }
}