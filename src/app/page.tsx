// 1. Imports dos componentes de Features globais (compartilhados entre telas)
import { UrgentAlert } from "@/components/features/chamados/UrgentAlert";
import { TicketTable } from "@/components/features/chamados/TicketTable";

// 2. Imports dos componentes Locais (exclusivos do Dashboard)
import { AnalyticGrid } from "@/components/features/dashboard/AnalyticGrid";
import { UrgentTicketRow } from "@/components/features/chamados/UrgentTicketRow";

// 3. Imports da Camada de Domínio / Regras de Negócio (Usecases)
import { getDashboardAnalyticsUseCase } from "@/modules/tickets/use-cases/GetDashboardAnalyticUseCase";
import { getFilaTicketsUseCase } from "@/modules/tickets/use-cases/GetFilaTicketsUseCase";

export default async function HomePage() {
  // 4. Execução paralela de alta performance no servidor (I/O em paralelo)
  const [analytics, filaTickets] = await Promise.all([
    getDashboardAnalyticsUseCase(),
    getFilaTicketsUseCase(),
  ]);

  // Regra visual: o banner superior só é montado se houver crise operacional
  const temUrgencias = analytics.ticketsUrgentes.length > 0;

  return (
    <div className="space-y-6 p-6 min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* ─── BANNER DE CRISE (GLOBAL) ─── */}
      {temUrgencias && <UrgentAlert tickets={analytics.ticketsUrgentes} />}

      {/* ─── CABEÇALHO DA PÁGINA ─── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">Dashboard Geral</h1>
          <p className="text-sm text-zinc-400">Indicadores de performance e controle de fila em tempo real.</p>
        </div>
      </div>

      {/* ─── GRID DE MÉTRICAS (LOCAL) ─── */}
      {/* Passa o DTO consolidado para os 4 cartões superiores */}
      <AnalyticGrid data={analytics} />

      {/* ─── BLOCO PRINCIPAL (LAYOUT DIVIDIDO) ─── */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* COLUNA ESQUERDA (2/3): Fila Regular de Chamados */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5 shadow-sm">
            <h2 className="text-lg font-medium text-zinc-200 mb-4">Chamados Recentes</h2>
            {/* Injeta a lista limpa e formatada pelo DTO na tabela reaproveitável */}
            <TicketTable data={filaTickets} />
          </div>
        </div>

        {/* COLUNA DIREITA (1/3): Painel de Foco Crítico */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5 shadow-sm h-fit">
          <div className="mb-4">
            <h2 className="text-lg font-medium text-zinc-200">🔥 Foco Crítico</h2>
            <p className="text-xs text-zinc-500">Ações urgentes ordenadas pelo tempo restante de SLA.</p>
          </div>
          
          {/* Loop controlado com base nos dados do Analytics */}
          <div className="space-y-2">
            {temUrgencias ? (
              analytics.ticketsUrgentes.map((ticket: any) => (
                <UrgentTicketRow key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="text-center py-6 border border-dashed border-zinc-800 rounded-lg">
                <p className="text-sm text-zinc-500">Fila limpa! Sem urgências pendentes. 🚀</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}