// src/modules/catalog/use-cases/delete-service.use-case.ts
import { serviceRepository } from "../repositories/service.repository";

export async function deleteServiceUseCase(id: string) {
  // 1. Verifica se existem tickets vinculados a este serviço
  const ticketsCount = await serviceRepository.countTicketsByServiceId(id);

  if (ticketsCount > 0) {
    throw new Error(
      `Não é possível excluir este serviço pois existem ${ticketsCount} chamado(s) vinculado(s) a ele.`
    );
  }

  // 2. Se não houver pendências, realiza a exclusão
  await serviceRepository.delete(id);
}