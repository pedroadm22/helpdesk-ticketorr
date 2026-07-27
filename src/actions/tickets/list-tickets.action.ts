"use server";

import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { listTicketsUseCase } from "@/modules/tickets/use-cases/list-tickets.use-case";

export async function listTicketsAction() {
  try {
    // 1. Obtém o usuário autenticado atual
    const currentUser = await getCurrentUserUseCase();

    if (!currentUser) {
      return { success: false, error: "Usuário não autenticado." };
    }

    // 2. Chama a função pura do Use Case passando os parâmetros necessários
    const tickets = await listTicketsUseCase({
      requestedByUserId: currentUser.id,
      requestedByUserRole: currentUser.role,
    });

    return { success: true, data: tickets };
  } catch (error: any) {
    console.error("❌ Erro em listTicketsAction:", error);
    return {
      success: false,
      error: error.message || "Erro ao buscar a lista de chamados.",
    };
  }
}