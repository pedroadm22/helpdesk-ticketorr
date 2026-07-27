import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema";
import { CreateServiceInput, createServiceSchema } from "../dto/create-service.dto";
import { serviceRepository, ServiceEntity } from "../repositories/service.repository";
import { eq } from "drizzle-orm";

export async function createServiceUseCase(
  input: CreateServiceInput
): Promise<ServiceEntity> {
  // 1. Valida a estrutura com o Zod
  const validatedData = createServiceSchema.parse(input);

  // 2. Regra de Negócio: O departamento associado existe?
  const [departmentExists] = await db
    .select({ id: departments.id })
    .from(departments)
    .where(eq(departments.id, validatedData.departmentId))
    .limit(1);

  if (!departmentExists) {
    throw new Error(
      "Não é possível criar o serviço: Departamento associado não existe."
    );
  }

  // 3. Insere via repositório funcional
  const newService = await serviceRepository.create({
    name: validatedData.name,
    description: validatedData.description ?? null,
    departmentId: validatedData.departmentId,
  });

  return newService;
}