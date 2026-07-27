import { db } from "@/infrastructure/db"; // seu cliente Drizzle
import { departments, services } from "@/infrastructure/db/schema"; // suas tabelas
import { eq } from "drizzle-orm";

export async function deleteDepartmentUseCase(id: string) {
  // 1. Verifica se existem serviços vinculados a este departamento
  const linkedServices = await db.query.services.findFirst({
    where: eq(services.departmentId, id),
  });

  if (linkedServices) {
    throw new Error(
      "Não é possível excluir um departamento que possui serviços vinculados. Remova ou reatribua os serviços primeiro."
    );
  }

  // 2. Executa a exclusão no banco de dados
  await db.delete(departments).where(eq(departments.id, id));
}