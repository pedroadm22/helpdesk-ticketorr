"use server";

import { createClient } from "@/infrastructure/supabase/server";
import { db } from "@/infrastructure/db";
import { tickets } from "@/infrastructure/db/schema";
import { revalidatePath } from "next/cache";

export async function createTicketAction(data: {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  departmentId: string;
  serviceId: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Usuário não autenticado." };
  }

  try {
    const [newTicket] = await db
      .insert(tickets)
      .values({
        title: data.title,
        description: data.description,
        priority: data.priority,
        departmentId: data.departmentId,
        serviceId: data.serviceId,
        clientId: user.id, // Vínculo com a tabela public.users / auth.users
        status: "WAITING_SUPPORT",
      })
      .returning();

    // Revalida a página da tabela pra atualizar instantaneamente
    revalidatePath("/dashboard/tickets");

    return { success: true, ticketId: newTicket.id };
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    return { success: false, error: "Falha ao abrir o chamado no banco." };
  }
}