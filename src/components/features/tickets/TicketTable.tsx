// src/components/features/ticket/TicketTable.tsx
import { TicketRow } from "./TicketRow";

interface TicketTableProps {
  tickets: any[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  return (
    <div className="w-full bg-zinc-950 p-4 rounded-xl">
      {/* 🟢 Títulos do Cabeçalho alinhados em Grid de 12 colunas */}
      <div className="grid grid-cols-12 px-4 py-3 text-xs font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-900 mb-2">
        <div className="col-span-3">Protocolo</div> {/* 🟢 Mudou de 2 para 3 */}
        <div className="col-span-4">Assunto / Cliente</div>{" "}
        <div className="col-span-3">Status</div>
        <div className="col-span-2 text-right">Abertura</div>
      </div>
      {/* Lista de Tickets */}
      <div className="space-y-2 w-full">
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
}
