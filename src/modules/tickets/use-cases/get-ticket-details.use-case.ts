import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema/auth";
import { GetTicketDetailsInput, GetTicketDetailsSchema } from "../dto/get-ticket-details.dto";
import { ticketRepository, TicketWithDetails } from "../repositories/ticket.repository";

export async function getTicketDetailsUseCase(
  input: GetTicketDetailsInput
): Promise<TicketWithDetails> {
  const validatedData = GetTicketDetailsSchema.parse(input);

  // 1. Busca o ticket com os detalhes do cliente via repositório
  const ticketWithDetails = await ticketRepository.findByIdWithDetails(
    validatedData.ticketId
  );

  if (!ticketWithDetails) {
    throw new Error("Ticket não encontrado.");
  }

  // 2. Busca o perfil do usuário visualizador
  const [viewer] = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, validatedData.viewerId))
    .limit(1);

  if (!viewer) {
    throw new Error("Usuário visualizador não encontrado.");
  }

  const isSupport = viewer.role === "ADMIN" || viewer.role === "TECHNICIAN";

  // 3. Regra de Negócio: Se for suporte e o ticket estiver "WAITING_SUPPORT", assume e altera para "VIEWED"
  if (isSupport && ticketWithDetails.status === "WAITING_SUPPORT") {
    const updatedTicket = await ticketRepository.update(validatedData.ticketId, {
      status: "VIEWED",
      agentId: ticketWithDetails.agentId ? ticketWithDetails.agentId : validatedData.viewerId,
    });

    if (updatedTicket) {
      return {
        ...ticketWithDetails,
        ...updatedTicket,
      };
    }
  }

  return ticketWithDetails;
}