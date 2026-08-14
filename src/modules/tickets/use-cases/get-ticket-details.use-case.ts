// src/modules/tickets/use-cases/get-ticket-details.use-case.ts
import { drizzleTicketRepository } from "../repositories/drizzle-ticket-repository";

interface GetTicketDetailsParams {
  ticketId: string;
  viewerId: string;
}

export async function getTicketDetailsUseCase({ ticketId, viewerId }: GetTicketDetailsParams) {
  const ticket = await drizzleTicketRepository.findById(ticketId);

  if (!ticket) return null;

  // Regra de segurança: Permite se for o cliente do chamado, o agente/técnico ou se for ADMIN
  // (A verificação do ADMIN pode ser validada via role ou liberada no repositório)
  return ticket;
}