"use server";

import { revalidatePath } from "next/cache";
import { deleteDepartmentUseCase } from "@/modules/departments/use-cases/delete-department.use-case";

export async function deleteDepartmentAction(id: string) {
  try {
    await deleteDepartmentUseCase(id);

    // Revalida as rotas afetadas pela remoção do departamento
    revalidatePath("/departments");
    revalidatePath("/services");
    revalidatePath("/ticket");

    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Erro ao remover o departamento.",
    };
  }
}