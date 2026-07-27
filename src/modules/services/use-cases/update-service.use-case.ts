import { db } from "@/infrastructure/db";
import { departments } from "@/infrastructure/db/schema";
import { UpdateServiceInput, updateServiceSchema } from "../dto/update-service.dto";
import { serviceRepository, ServiceEntity } from "../repositories/service.repository";
import { eq } from "drizzle-orm";

export async function updateServiceUseCase(
  input: UpdateServiceInput
): Promise<ServiceEntity> {
  // 1. Valida a entrada parcial
  const validatedData = updateServiceSchema.parse(input);

  // 2. Se o departamento estiver sendo alterado, valida a existência do novo departamento
  if (validatedData.departmentId) {
    const [departmentExists] = await db
      .select({ id: departments.id })
      .from(departments)
      .where(eq(departments.id, validatedData.departmentId))
      .limit(1);

    if (!departmentExists) {
      throw new Error(
        "Não é possível alterar o serviço: O novo departamento informado não existe."
      );
    }
  }

  // 3. Monta o payload parcial para atualização
  const updatePayload: Parameters<typeof serviceRepository.update>[1] = {};

  if (validatedData.name) {
    updatePayload.name = validatedData.name;
  }
  if (validatedData.description !== undefined) {
    updatePayload.description = validatedData.description;
  }
  if (validatedData.departmentId) {
    updatePayload.departmentId = validatedData.departmentId;
  }

  // 4. Executa a atualização via repositório funcional
  const updated = await serviceRepository.update(validatedData.id, updatePayload);

  if (!updated) {
    throw new Error("Não foi possível atualizar: Serviço não encontrado.");
  }

  return updated;
}