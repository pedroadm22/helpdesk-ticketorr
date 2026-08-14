// src/modules/catalog/services/use-cases/list-services.use-case.ts
import { drizzleServiceRepository } from "../repositories/drizzle-service.repository"; // 👈 Importe sua instância real
import type { IServiceRepository } from "../repositories/service-repository.interface";
import type { ListServicesFilterDTO } from "../dtos/list-services-filter.dto";
import type { ServiceResponseDTO } from "../dtos/service-response.dto";

export async function listServicesUseCase(
  filter?: ListServicesFilterDTO,
  serviceRepo: IServiceRepository = drizzleServiceRepository // 🟢 Injeção com valor padrão!
): Promise<{ data: ServiceResponseDTO[]; total: number } | ServiceResponseDTO[]> {
  const result = await serviceRepo.list(filter ?? {});
  return result;
}