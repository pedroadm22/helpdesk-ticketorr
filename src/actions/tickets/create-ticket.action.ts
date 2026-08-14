// src/modules/tickets/actions/create-ticket.action.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { createTicketUseCase } from "@/modules/tickets/use-cases/create-ticket.use-case";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";

export async function createTicketAction(data: {
  serviceId: string;
  departmentId: string;
  description: string;
}) {
  try {
    const user = await getCurrentUserUseCase();
    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    const ticket = await createTicketUseCase({
      title: "Solicitação de Chamado",
      description: data.description,
      serviceId: data.serviceId,
      departmentId: data.departmentId,
      clientId: user.id,
      priority: "MEDIUM",
    });

    // Passamos o segundo argumento exigido pela nova tipagem
    revalidateTag("tickets-list", "default");

    revalidatePath("/ticket");
    revalidatePath("/dashboard");

    return { success: true, data: ticket };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Erro ao abrir chamado.",
    };
  }
}