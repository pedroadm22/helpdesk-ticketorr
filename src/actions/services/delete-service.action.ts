"use server";

import { revalidatePath } from "next/cache";
import { deleteServiceUseCase } from "@/modules/catalog/services/use-cases/delete-service.use-case";

export async function deleteServiceAction(id: string) {
  try {
    await deleteServiceUseCase(id);

    revalidatePath("/services");
    revalidatePath("/ticket");

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Erro ao remover o serviço.",
    };
  }
}