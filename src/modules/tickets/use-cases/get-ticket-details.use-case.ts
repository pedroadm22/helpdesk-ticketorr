import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { user } from "@/infrastructure/db/schema/auth";
import { GetTicketDetailsInput, GetTicketDetailsSchema } from "../dto/get-ticket-details.dto";

type Ticket = typeof tickets.$inferSelect;

export class GetTicketDetailsUseCase {
  async execute(input: GetTicketDetailsInput): Promise<Ticket> {
    const validatedData = GetTicketDetailsSchema.parse(input);

    // 1. Busca o ticket
    const [ticket] = await db
      .select()
      .from(tickets)
      .where(eq(tickets.id, validatedData.ticketId))
      .limit(1);

    if (!ticket) {
      throw new Error("Ticket não encontrado.");
    }

    // 2. Busca o perfil de quem está abrindo o ticket
    const [viewer] = await db
      .select()
      .from(user)
      .where(eq(user.id, validatedData.viewerId))
      .limit(1);

    if (!viewer) {
      throw new Error("Usuário visualizador não encontrado.");
    }

    const isSupport = viewer.role === "admin" || viewer.role === "technician";
    const now = new Date();

    // 3. Regra de Negócio: Se for suporte e o ticket estiver intocado, assume o chamado
    if (isSupport && ticket.status === "WAITING_SUPPORT") {
      const [updatedTicket] = await db
        .update(tickets)
        .set({
          status: "VIEWED",
          agentId: ticket.agentId ? ticket.agentId : validatedData.viewerId, // Auto-atribui se não tiver técnico
          updatedAt: now,
        })
        .where(eq(tickets.id, validatedData.ticketId))
        .returning();

      return updatedTicket;
    }

    return ticket;
  }
}