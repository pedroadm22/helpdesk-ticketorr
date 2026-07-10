import { Plus } from "lucide-react";
import { TicketTable } from "@/components/features/ticket/TicketTable";
import { getFilaTicketsUseCase } from "@/modules/tickets/use-cases/GetFilaTicketsUseCase";
import Link from "next/link";
import { listarTicketsUseCase } from "@/modules/tickets/use-cases/ListarTicketUseCase";
import { auth } from '@/infrastructure/auth';
import { headers } from "next/headers";
import { redirect } from 'next/navigation';

// Repare: Sem "use client". A página agora é um Server Component nativo.
export default async function ChamadosPage() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const filaTickets = await getFilaTicketsUseCase();

  const chamadosFiltrados = await listarTicketsUseCase({
      usuarioId: session.user.id,
      role: session.user.role as "CLIENTE" | "TECNICO" | "ADMIN",
    });

  return (
    <div className="space-y-8 p-6 min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* Título da Página e Botão de Ação */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fila de Chamados</h1>
          <p className="text-sm text-zinc-400">Monitore, responda e gerencie os tickets de suporte dos usuários.</p>
        </div>
        
        {/* Botão para abrir modal ou redirecionar para formulário */}
        <Link 
          href="/ticket/abrir-ticket" 
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-all duration-200 shadow-lg shadow-blue-600/10 active:scale-98"
        >
          <Plus size={16} />
          <span>Abrir Chamado</span>
        </Link>
      </div>

      {/* ─── TABELA DE CHAMADOS ATIVOS (COMPONENTE COMPARTILHADO) ─── */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/20 overflow-hidden">
        <div className="p-5 border-b border-zinc-800 bg-zinc-900/40">
          <h2 className="font-semibold text-zinc-200">Todos os Chamados Ativos</h2>
        </div>
        
        {/* Reaproveitando a estrutura inteligente com os Badges automáticos */}
        <div className="p-4">
          <TicketTable tickets={filaTickets} />
        </div>
      </div>

    </div>
  );
}