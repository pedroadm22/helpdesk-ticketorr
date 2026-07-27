// src/modules/tickets/actions/assign-ticket.action.ts
"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { assignTicketUseCase } from "@/modules/tickets/use-cases/assign-ticket.use-case"; // Seu use-case que faz o update no banco

export async function assignTicketAction(data: {
  ticketId: string;
  agentId: string;
}) {
  try {
    const currentUser = await getCurrentUserUseCase();

    // Trava de segurança: apenas ADMIN pode encaminhar
    if (!currentUser || currentUser.role !== "ADMIN") {
      return { success: false, error: "Ação permitida apenas para administradores." };
    }

    await assignTicketUseCase({
      ticketId: data.ticketId,
      agentId: data.agentId,
    });

    revalidatePath("/ticket");
    revalidatePath(`/ticket/${data.ticketId}`);
    
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Erro ao encaminhar chamado.",
    };
  }
}