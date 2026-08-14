"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveServiceUseCase } from "@/modules/services/use-cases/save-service.use-case";

export async function saveServiceAction(data: {
  id?: string;
  name: string;
  description?: string | null;
  departmentId: string;
}) {
  try {
    await saveServiceUseCase(data);

    revalidatePath("/services");
    revalidatePath("/ticket");
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Erro ao salvar o serviço.",
    };
  }

  redirect("/services");
}