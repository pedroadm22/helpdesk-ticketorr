import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema/departments";
import { UpdateDepartmentInput, updateDepartmentSchema } from "../dto/update-department.dto";
import { eq } from "drizzle-orm";

// 🌟 Inferindo o tipo do select do Drizzle diretamente do schema da tabela
type Department = typeof departments.$inferSelect;

export class UpdateDepartmentUseCase {
  // Usamos o tipo inferido diretamente aqui, sem precisar de um arquivo DTO de saída dedicado!
  async execute(input: UpdateDepartmentInput): Promise<Department> {
    const validatedData = updateDepartmentSchema.parse(input);

    const [updated] = await db
      .update(departments)
      .set({
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.description !== undefined && { description: validatedData.description }),
        updatedAt: new Date(), // Ajustado para aceitar Date conforme o erro anterior!
      })
      .where(eq(departments.id, validatedData.id))
      .returning();

    if (!updated) {
      throw new Error("Não foi possível atualizar: Departamento não encontrado.");
    }

    return updated;
  }
}