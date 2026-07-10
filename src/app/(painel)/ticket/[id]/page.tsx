// src/app/ticket/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers"; //
import { auth } from "@/infrastructure/auth"; //
import { getHistoricoChatUseCase } from "@/modules/tickets/use-cases/GetHistoricoChatUseCase";
import { getTicketDetalheUseCase } from "@/modules/tickets/use-cases/GetTicketDetalheUseCase";
import { ChatBoxContainer } from "@/components/features/chat/ChatBoxContainer";
import { TicketSidebar } from "@/components/features/ticket-detalhes/TicketSidebar";
import { TicketHeader } from "@/components/features/ticket-detalhes/TicketHeader";

interface TicketDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function PaginaDetailDocChamado({
  params,
}: TicketDetailsPageProps) {
  // 1. Aguarda a Promise do params ser resolvida pelo Next.js
  const resolvedParams = await params;
  const ticketId = resolvedParams.id;

  if (!ticketId) {
    notFound();
  }

  // 🌟 2. PROTEÇÃO DE ROTA: Busca a sessão real do usuário logado no servidor
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se o cara não estiver logado, barra ele e joga pra tela inicial/login
  if (!session) {
    redirect("/");
  }

  try {
    // 3. Busca o ticket e o histórico em paralelo no banco de dados
    const [ticket, historico] = await Promise.all([
      getTicketDetalheUseCase({
        ticketId: ticketId,
        usuarioId: session.user.id,
        role: session.user.role as "CLIENTE" | "TECNICO" | "ADMIN",
      }),
      getHistoricoChatUseCase(ticketId),
    ]);

    // Se o caso de uso não achar o chamado, joga um 404
    if (!ticket) {
      notFound();
    }

    // 🌟 4. TRANSFORMAÇÃO: O ID agora vem direto da sessão segura do Better Auth!
    const usuarioAtualId = session.user.id;

    return (
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-6 flex flex-col gap-6">
        <TicketHeader
          protocolo={ticket.protocolo}
          titulo={ticket.titulo}
          descricao={ticket.descricao}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <TicketSidebar
            status={ticket.status}
            prioridade={ticket.prioridade}
            clienteNome={ticket.cliente.name}
          />

          <div className="lg:col-span-2 flex justify-center">
            <ChatBoxContainer
              ticketId={ticket.id}
              usuarioAtualId={usuarioAtualId} // Repassando o ID legítimo ("nq48z8g...")
              historicoInicial={historico}
            />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error("Erro ao carregar página do chamado:", error);
    notFound();
  }
}
