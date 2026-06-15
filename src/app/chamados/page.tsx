import { Plus } from "lucide-react";
import { TicketTable } from "@/components/features/chamados/TicketTable";
import { getFilaTicketsUseCase } from "@/modules/tickets/usecases/GetFilaTicketsUseCase";
import Link from "next/link";

// Repare: Sem "use client". A página agora é um Server Component nativo.
export default async function ChamadosPage() {
  // Busca os dados atualizados direto do banco SQLite via Drizzle no servidor
  const filaTickets = await getFilaTicketsUseCase();

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
          href="/chamados/abrir-chamado" 
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
          <TicketTable data={filaTickets} />
        </div>
      </div>

    </div>
  );
}