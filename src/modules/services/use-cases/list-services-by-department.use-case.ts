import { db } from "@/infrastructure/db";
import { services } from "@/infrastructure/db/schema"; // Importa do barrel file da infraestrutura
import { eq, asc } from "drizzle-orm";

// 🌟 Inferimos o tipo do serviço diretamente da tabela, sem criar arquivos extras!
type Service = typeof services.$inferSelect;

export class ListServicesByDepartmentUseCase {
  // Recebe o ID diretamente como string e retorna uma Promise de array de Services
  async execute(departmentId: string): Promise<Service[]> {
    const result = await db
      .select()
      .from(services)
      .where(eq(services.departmentId, departmentId))
      .orderBy(asc(services.name));

    return result;
  }
}