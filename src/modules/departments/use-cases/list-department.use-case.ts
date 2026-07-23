import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema/departments";
import { asc } from "drizzle-orm";

type Department = typeof departments.$inferSelect;

export class ListDepartmentsUseCase {
  async execute(): Promise<Department[]> {
    // Busca e ordena de forma ascendente pelo nome do setor
    const result = await db
      .select()
      .from(departments)
      .orderBy(asc(departments.name));

    return result;
  }
}