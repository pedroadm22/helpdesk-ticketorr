import { db } from "@/infrastructure/db";
import { services, departments } from "@/infrastructure/db/schema";
import { UpdateServiceInput, updateServiceSchema } from "../dto/update-service.dto";
import { eq } from "drizzle-orm";

type Service = typeof services.$inferSelect;

export class UpdateServiceUseCase {
  async execute(input: UpdateServiceInput): Promise<Service> {
    // 1. Valida a entrada parcial
    const validatedData = updateServiceSchema.parse(input);

    // 2. Se o departamento estiver sendo alterado, valida a existência do novo departamento
    if (validatedData.departmentId) {
      const [departmentExists] = await db
        .select()
        .from(departments)
        .where(eq(departments.id, validatedData.departmentId))
        .limit(1);

      if (!departmentExists) {
        throw new Error("Não é possível alterar o serviço: O novo departamento informado não existe.");
      }
    }

    // 3. Executa a alteração incremental no banco
    const [updated] = await db
      .update(services)
      .set({
        ...(validatedData.name && { name: validatedData.name }),
        ...(validatedData.description !== undefined && { description: validatedData.description }),
        ...(validatedData.departmentId && { departmentId: validatedData.departmentId }),
        updatedAt: new Date(),
      })
      .where(eq(services.id, validatedData.id))
      .returning();

    if (!updated) {
      throw new Error("Não foi possível atualizar: Serviço não encontrado.");
    }

    return updated;
  }
}