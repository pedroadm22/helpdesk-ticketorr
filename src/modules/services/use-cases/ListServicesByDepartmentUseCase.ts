import { db } from "@/infrastructure/db";
import { services } from "@/infrastructure/db/schema/services";
import { ServiceOutput } from "../../services/dto/ServiceOutputDto";
import { eq, asc } from "drizzle-orm";

export class ListServicesByDepartmentUseCase {
  async execute(departmentId: string): Promise<ServiceOutput[]> {
    // Busca e ordena os serviços ativos daquele setor por nome de forma crescente
    const result = await db
      .select()
      .from(services)
      .where(eq(services.departmentId, departmentId))
      .orderBy(asc(services.name));

    return result;
  }
}