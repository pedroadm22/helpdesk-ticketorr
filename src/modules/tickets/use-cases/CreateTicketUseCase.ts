import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { CreateTicketInput, CreateTicketSchema } from "../dto/CreateTicketDto";
import { randomUUID } from "crypto";

type Ticket = typeof tickets.$inferSelect;

export class CreateTicketUseCase {
  async execute(input: CreateTicketInput): Promise<Ticket> {
    const validatedData = CreateTicketSchema.parse(input);
    const now = new Date();

    const [newTicket] = await db
      .insert(tickets)
      .values({
        id: randomUUID(),
        title: validatedData.title,
        description: validatedData.description,
        departmentId: validatedData.departmentId,
        serviceId: validatedData.serviceId,
        clientId: validatedData.clientId,
        priority: validatedData.priority ?? "MEDIUM",
        status: "WAITING_SUPPORT", // Todo chamado nasce aguardando suporte
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    if (!newTicket) {
      throw new Error("Erro ao criar o ticket no banco de dados.");
    }

    return newTicket;
  }
}