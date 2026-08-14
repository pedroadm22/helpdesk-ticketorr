// src/modules/tickets/components/TicketSidebar.tsx
"use client";

interface TicketSidebarProps {
  status: string;
  prioridade: string;
  clienteNome: string;
}

export function TicketSidebar({ status, prioridade, clienteNome }: TicketSidebarProps) {
  return (
    <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-5 space-y-4 h-fit">
      <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Painel Técnico</h2>
      <hr className="border-zinc-800" />
      
      <div>
        <label className="text-xs text-zinc-500 block font-medium">Status Atual</label>
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 mt-1.5">
          {status}
        </span>
      </div>

      <div>
        <label className="text-xs text-zinc-500 block font-medium">Prioridade</label>
        <span className="inline-block text-xs font-semibold px-2 py-1 rounded bg-red-950/40 border border-red-900/50 text-red-400 mt-1.5">
          {prioridade}
        </span>
      </div>

      <div>
        <label className="text-xs text-zinc-500 block font-medium">Solicitante</label>
        <p className="text-sm text-zinc-300 mt-1 font-medium">{clienteNome}</p>
      </div>
    </div>
  );
}