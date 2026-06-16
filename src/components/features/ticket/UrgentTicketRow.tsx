import React from "react";
import Link from "next/link";
import { PriorityBadge } from "./PriorityBadge";
import { StatusBadge } from "./StatusBadge";
import { Ticket } from "@/shared/types/domain/ticket";

interface UrgentTicketRowProps {
  ticket: Ticket;
}

export function UrgentTicketRow({ ticket }: UrgentTicketRowProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-zinc-500">{ticket.protocolo}</span>
          <h3 className="text-sm font-medium text-zinc-200">{ticket.titulo}</h3>
        </div>
        <p className="text-xs text-zinc-500">Disparado por: {ticket.cliente?.nome}</p>
      </div>

      <div className="flex items-center gap-3">
        <PriorityBadge prioridadeId={ticket.prioridadeId} nome={ticket.prioridade?.nome} />
        <StatusBadge statusId={ticket.statusId} nome={ticket.status?.nome} />
        <Link 
          href={`/chamados/${ticket.id}`}
          className="px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
        >
          Assumir
        </Link>
      </div>
    </div>
  );
}