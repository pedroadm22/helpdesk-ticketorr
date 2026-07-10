// src/components/features/ticket/TicketRow.tsx
"use client";

import Link from "next/link";

// 🌟 Definimos a interface para remover o 'any' e garantir autocomplete seguro
interface TicketRowProps {
  ticket: {
    id: string;
    protocolo: string;
    titulo: string;
    descricao: string;
    status: string;      // Nome real do status vindo do leftJoin
    prioridade: string;  // Nome real da prioridade vindo do leftJoin
    dataCriacao: Date | number;
  };
}

export function TicketRow({ ticket }: TicketRowProps) {
  if (!ticket) return null;

  // 🗓️ Função auxiliar simples para tratar e formatar a data com segurança
  const formatarData = (data: Date | number) => {
    const dataObj = data instanceof Date ? data : new Date(data);
    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Link
      href={`/ticket/${ticket.id}`}
      className="grid grid-cols-12 items-center w-full px-4 py-4 bg-zinc-900/20 border border-zinc-900 hover:border-blue-500/40 hover:bg-zinc-900/50 rounded-xl transition-all group cursor-pointer"
    >
      {/* 1. PROTOCOLO */}
      <div className="col-span-3 flex items-center">
        <span className="inline-flex items-center justify-center text-xs font-mono font-bold text-blue-400 bg-blue-950/35 px-2.5 py-1 rounded border border-blue-900/40 whitespace-nowrap">
          {ticket.protocolo}
        </span>
      </div>

      {/* 2. ASSUNTO */}
      <div className="col-span-4 space-y-1 pr-4">
        <h3 className="text-sm font-bold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
          {ticket.titulo}
        </h3>
        <p className="text-xs text-zinc-500 truncate">
          Prioridade:{" "}
          <span className="text-zinc-400 font-medium">
            {ticket.prioridade}
          </span>
        </p>
      </div>

      {/* 3. STATUS (Usa o valor real dinâmico do banco de dados) */}
      <div className="col-span-3">
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-950/30 border border-blue-900/50 text-blue-400 uppercase tracking-wide text-[10px]">
          {ticket.status}
        </span>
      </div>

      {/* 4. ABERTURA (Tratada e convertida em String legítima) */}
      <div className="col-span-2 text-right text-xs text-zinc-400 font-medium">
        {formatarData(ticket.dataCriacao)}
      </div>
    </Link>
  );
}