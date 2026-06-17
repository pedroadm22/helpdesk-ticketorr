// src/modules/tickets/components/TicketHeader.tsx
"use client";

interface TicketHeaderProps {
  protocolo: string;
  titulo: string;
  descricao: string;
}

export function TicketHeader({ protocolo, titulo, descricao }: TicketHeaderProps) {
  return (
    <div className="border-b border-zinc-800 pb-4">
      <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/40 px-2 py-1 rounded border border-blue-900/50">
        {protocolo}
      </span>
      <h1 className="text-2xl font-bold mt-2 tracking-tight {ticket.titulo}">{titulo}</h1>
      <p className="text-zinc-400 text-sm mt-1">{descricao}</p>
    </div>
  );
}