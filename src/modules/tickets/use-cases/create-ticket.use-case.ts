import { CreateTicketInput, CreateTicketSchema } from "../dto/create-ticket.dto";
import { ticketRepository, TicketEntity } from "../repositories/ticket.repository";

export async function createTicketUseCase(
  input: CreateTicketInput
): Promise<TicketEntity> {
  // 1. Valida a entrada com o Zod
  const validatedData = CreateTicketSchema.parse(input);

  // 2. Cria o chamado utilizando o repositório funcional
  const newTicket = await ticketRepository.create({
    title: validatedData.title,
    description: validatedData.description,
    departmentId: validatedData.departmentId,
    serviceId: validatedData.serviceId,
    clientId: validatedData.clientId,
    priority: validatedData.priority ?? "MEDIUM",
    status: "WAITING_SUPPORT", // Todo chamado nasce aguardando suporte
  });

  return newTicket;
}