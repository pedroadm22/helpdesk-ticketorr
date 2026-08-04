// src/app/(painel)/ticket/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { getTicketDetailsUseCase } from "@/modules/tickets/use-cases/get-ticket-details.use-case";
import { listTechniciansUseCase } from "@/modules/auth/use-cases/list-technicians.use-case";

import { TicketHeaderCard } from "@/components/features/ticket-details/ticket-header-card";
import { TicketChat } from "@/components/features/ticket-details/ticket-chat";
import { TicketAdminActions, type TechnicianOption } from "@/components/features/ticket-details/ticket-admin-actions";

interface TicketDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({
  params,
}: TicketDetailPageProps) {
  const { id } = await params;
  const user = await getCurrentUserUseCase();

  // 1. Redirecionamento de segurança para sessão expirada/inexistente
  if (!user) {
    redirect("/login");
  }

  // 2. Busca os detalhes do chamado com validação de escopo de visualização
  const ticket = await getTicketDetailsUseCase({
    ticketId: id,
    viewerId: user.id,
  });

  if (!ticket) {
    notFound();
  }

  // 3. Busca lista de técnicos com suporte a múltiplos formatos de retorno DTO
  let techniciansList: TechnicianOption[] = [];

  if (user.role === "ADMIN") {
    const rawTechnicians = await listTechniciansUseCase();
    
    // Extrai com segurança caso venha envelopado em { data: [...] } ou Array
    const techsData = Array.isArray(rawTechnicians) 
      ? rawTechnicians 
      : (rawTechnicians as { data?: TechnicianOption[] })?.data ?? [];

    techniciansList = techsData.map((tech) => ({
      id: tech.id,
      name: tech.name,
      email: tech.email,
    }));
  }

  // Formatação segura de datas para o Server Component
  const formattedCreatedAt = new Date(ticket.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedUpdatedAt = new Date(ticket.updatedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Cabeçalho do Chamado com Status, Prioridade e Informações Principais */}
      <TicketHeaderCard ticket={ticket} currentUserRole={user.role} />

      {/* Painel de atribuição rápida exclusivo para administradores */}
      {user.role === "ADMIN" && (
        <TicketAdminActions
          ticketId={ticket.id}
          currentAgentId={ticket.agentId}
          techniciansList={techniciansList}
        />
      )}

      {/* Comunicação em tempo real e linha do tempo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat / Histórico de Mensagens */}
        <div className="lg:col-span-3">
          <TicketChat ticketId={ticket.id} currentUser={user} />
        </div>

        {/* Sidebar com Metadados e Linha do Tempo */}
        <div className="space-y-4">
          <div className="p-4 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3 shadow-sm">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Linha do Tempo
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex justify-between items-center py-1 border-b border-zinc-800/50">
                <span>Aberto em:</span>
                <span className="text-zinc-200 font-medium">
                  {formattedCreatedAt}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Última atualização:</span>
                <span className="text-zinc-200 font-medium">
                  {formattedUpdatedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}