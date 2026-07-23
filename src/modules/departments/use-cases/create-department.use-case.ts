import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema/departments";
import { CreateDepartmentInput, createDepartmentSchema } from "../dto/create-department.dto";
import { randomUUID } from "crypto";

// 🌟 Inferindo o tipo de retorno diretamente da tabela do Drizzle
type Department = typeof departments.$inferSelect;

export class CreateDepartmentUseCase {
  async execute(input: CreateDepartmentInput): Promise<Department> {
    // 1. Valida a entrada com o DTO do Zod
    const validatedData = createDepartmentSchema.parse(input);

    // 2. Prepara o objeto com timestamps no formato Date esperado pelo seu schema
    const newDepartment = {
      id: randomUUID(),
      name: validatedData.name,
      description: validatedData.description ?? null,
      createdAt: new Date(), 
      updatedAt: new Date(),
    };

    // 3. Insere no SQLite
    const [inserted] = await db
      .insert(departments)
      .values(newDepartment)
      .returning();

    if (!inserted) {
      throw new Error("Erro ao criar o departamento no banco de dados.");
    }

    return inserted;
  }
}