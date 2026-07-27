// src/modules/tickets/actions/create-ticket.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { createTicketUseCase } from "@/modules/tickets/use-cases/create-ticket.use-case";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case"; // Substitua pelo seu método de pegar o usuário logado

export async function createTicketAction(data: {
  serviceId: string;
  departmentId: string;
  description: string;
}) {
  try {
    // 1. Pega o usuário logado no servidor para obter o clientId
    const user = await getCurrentUserUseCase();
    if (!user) {
      return { success: false, error: "Usuário não autenticado." };
    }

    // 2. Chama o Use Case preenchendo todos os campos obrigatórios
    const ticket = await createTicketUseCase({
      title: "Solicitação de Chamado", // Título padrão simples
      description: data.description,
      serviceId: data.serviceId,
      departmentId: data.departmentId,
      clientId: user.id,
      priority: "MEDIUM", // Prioridade padrão
    });

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