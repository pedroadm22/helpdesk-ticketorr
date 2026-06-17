// src/app/ticket/[id]/page.tsx
import { notFound } from "next/navigation";
import { getHistoricoChatUseCase } from "@/modules/tickets/use-cases/GetHistoricoChatUseCase";
import { getTicketDetalheUseCase } from "@/modules/tickets/use-cases/GetTicketDetalheUseCase";
import { ChatBoxContainer } from "@/components/features/chat/ChatBoxContainer";

// 🟢 Novos componentes isolados
import { TicketSidebar } from "@/components/features/ticket-detalhes/TicketSidebar";
import { TicketHeader } from "@/components/features/ticket-detalhes/TicketHeader";

interface PaginaProps {
  params: Promise<{ id: string }>;
}

export default async function PaginaDetalheChamado({ params }: PaginaProps) {
  // 2. CORREÇÃO CRÍTICA: Aguarda a Promise do params ser resolvida pelo Next.js
  const resolvedParams = await params;
  const ticketId = resolvedParams.id;

  // Se o id por algum motivo bizarro não vier na URL, joga para o 404 antes de quebrar o Zod
  if (!ticketId) {
    notFound();
  }

  try {
    // 3. Agora o ticketId é uma string real e garantida. O Zod não vai mais reclamar!
    const [ticket, historico] = await Promise.all([
      getTicketDetalheUseCase(ticketId),
      getHistoricoChatUseCase(ticketId),
    ]);

    const usuarioAtualId = "7ffac769-c3ea-433b-b883-9bf473b508c0";

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
            clienteNome={ticket.cliente.nome}
          />

          <div className="lg:col-span-2 flex justify-center">
            <ChatBoxContainer
              ticketId={ticket.id}
              usuarioAtualId={usuarioAtualId}
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
