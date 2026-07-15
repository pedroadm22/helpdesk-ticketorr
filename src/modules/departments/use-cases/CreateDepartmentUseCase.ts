import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema/departments";
import { CreateDepartmentInput, createDepartmentSchema } from "../dto/CreateDepartmentDto";
import { DepartmentOutput } from "../dto/DepartmentOutputDto";
import { randomUUID } from "crypto";

export class CreateDepartmentUseCase {
  async execute(input: CreateDepartmentInput): Promise<DepartmentOutput> {
    // 1. Validamos os dados de entrada usando o schema do DTO
    const validatedData = createDepartmentSchema.parse(input);

    // 2. Criamos o objeto final a ser persistido no banco
    const newDepartment = {
      id: randomUUID(),
      name: validatedData.name,
      description: validatedData.description ?? null,
      createdAt: Math.floor(Date.now() / 1000), // Padrão Unix Epoch para SQLite
      updatedAt: Math.floor(Date.now() / 1000),
    };

    // 3. Persistimos no banco usando o Drizzle
    const [inserted] = await db
      .insert(departments)
      .values(newDepartment)
      .returning(); // Retorna o registro inserido

    if (!inserted) {
      throw new Error("Erro ao criar o departamento no banco de dados.");
    }

    return inserted;
  }
}