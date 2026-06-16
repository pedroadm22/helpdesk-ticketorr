// src/components/features/ticket/TicketRow.tsx
"use client";

import Link from "next/link";

interface TicketRowProps {
  ticket: any;
}

export function TicketRow({ ticket }: TicketRowProps) {
  if (!ticket) return null;

  return (
    <Link
      href={`/ticket/${ticket.id}`}
      // 🟢 w-full faz expandir tudo horizontalmente, grid-cols-12 dita as mesmas colunas do pai
      className="grid grid-cols-12 items-center w-full px-4 py-4 bg-zinc-900/20 border border-zinc-900 hover:border-blue-500/40 hover:bg-zinc-900/50 rounded-xl transition-all group cursor-pointer"
    >
      {/* 1. PROTOCOLO (Ocupa 2 de 12 colunas) */}
      <div className="col-span-2">
        <span className="inline-block text-xs font-mono font-bold text-blue-400 bg-blue-950/30 px-2 py-1 rounded border border-blue-900/40 group-hover:border-blue-500/40 transition-colors">
          {ticket.protocolo}
        </span>
      </div>

      {/* 2. ASSUNTO / CLIENTE (Ocupa 5 de 12 colunas) */}
      <div className="col-span-5 space-y-1 pr-4">
        <h3 className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
          {ticket.titulo}
        </h3>
        <p className="text-xs text-zinc-500">
          Aberto por <span className="text-zinc-400 font-medium">{ticket.clienteNome}</span>
        </p>
      </div>

      {/* 3. STATUS (Ocupa 3 de 12 colunas) */}
      <div className="col-span-3">
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700/60 text-zinc-300">
          Aberto
        </span>
      </div>

      {/* 4. ABERTURA (Ocupa 2 de 12 colunas - Alinhado à direita para casar com o cabeçalho) */}
      <div className="col-span-2 text-right text-xs text-zinc-400 font-medium">
        {ticket.dataCriacao}
      </div>
    </Link>
  );
}