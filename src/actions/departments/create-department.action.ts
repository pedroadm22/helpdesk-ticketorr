"use server";

import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema";
import { revalidatePath } from "next/cache";

export async function createDepartmentAction(data: {
  name: string;
  description?: string;
}) {
  try {
    const [newDepartment] = await db
      .insert(departments)
      .values({
        name: data.name,
        description: data.description || null,
      })
      .returning();

    revalidatePath("/dashboard/admin/catalog");

    return { success: true, department: newDepartment };
  } catch (error) {
    console.error("Erro ao criar departamento:", error);
    return { success: false, error: "Erro ao cadastrar departamento. O nome já existe?" };
  }
}