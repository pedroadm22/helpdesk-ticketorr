// src/app/(painel)/ticket/[id]/page.tsx

import { notFound } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { getTicketDetailsUseCase } from "@/modules/tickets/use-cases/get-ticket-details.use-case";
import { TechnicianOption } from "@/components/features/ticket-details/ticket-admin-actions";

import { TicketHeaderCard } from "@/components/features/ticket-details/ticket-header-card";
import { TicketChat } from "@/components/features/ticket-details/ticket-chat";
import { TicketAdminActions } from "@/components/features/ticket-details/ticket-admin-actions";

interface TicketDetailPageProps {
  params: Promise<{ id: string }>;
}

import { listTechniciansUseCase } from "@/modules/auth/use-cases/list-technicians.use-case";

export default async function TicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { id } = await params;
  const user = await getCurrentUserUseCase();
  if (!user) return null;

  const ticket = await getTicketDetailsUseCase({
    ticketId: id,
    viewerId: user.id,
  });
  if (!ticket) notFound();

  // Define o tipo explicitamente na declaração do array
  let techniciansList: TechnicianOption[] = [];

  if (user.role === "ADMIN") {
    techniciansList = await listTechniciansUseCase();
  }

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <TicketHeaderCard ticket={ticket} currentUserRole={user.role} />

      {/* Componente de ações do ADMIN */}
      {user.role === "ADMIN" && (
        <TicketAdminActions
          ticketId={ticket.id}
          currentAgentId={ticket.agentId}
          techniciansList={techniciansList}
        />
      )}

      {/* 3. Área de Comunicação (Chat do Chamado) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Principal */}
        <div className="lg:col-span-3">
          <TicketChat ticketId={ticket.id} currentUser={user} />
        </div>

        {/* Sidebar de Status/Histórico rápido */}
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Linha do Tempo
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Aberto em:</span>
                <span className="text-zinc-200">
                  {new Date(ticket.createdAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Última atualização:</span>
                <span className="text-zinc-200">
                  {new Date(ticket.updatedAt).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
