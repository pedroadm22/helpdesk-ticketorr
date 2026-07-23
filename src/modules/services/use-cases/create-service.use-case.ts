import { db } from "@/infrastructure/db";
import { services, departments } from "@/infrastructure/db/schema";
import { CreateServiceInput, createServiceSchema } from "../dto/create-service.dto";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// Inferindo o tipo do select do Drizzle
type Service = typeof services.$inferSelect;

export class CreateServiceUseCase {
  async execute(input: CreateServiceInput): Promise<Service> {
    // 1. Valida a estrutura com o Zod
    const validatedData = createServiceSchema.parse(input);

    // 2. Regra de Negócio: O departamento associado existe?
    const [departmentExists] = await db
      .select()
      .from(departments)
      .where(eq(departments.id, validatedData.departmentId))
      .limit(1);

    if (!departmentExists) {
      throw new Error("Não é possível criar o serviço: Departamento associado não existe.");
    }

    // 3. Monta o objeto com os timestamps do tipo Date
    const newService = {
      id: randomUUID(),
      name: validatedData.name,
      description: validatedData.description ?? null,
      departmentId: validatedData.departmentId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 4. Insere no banco
    const [inserted] = await db
      .insert(services)
      .values(newService)
      .returning();

    if (!inserted) {
      throw new Error("Erro ao salvar o serviço no banco de dados.");
    }

    return inserted;
  }
}