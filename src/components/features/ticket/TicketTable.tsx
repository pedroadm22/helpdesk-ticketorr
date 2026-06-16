import { ListaFilaTicketsDto } from "@/modules/tickets/dto/ListaFilaTicketsDto";
import { TicketRow } from "./TicketRow";

interface TicketTableProps {
  data: ListaFilaTicketsDto;
}

export function TicketTable({ data }: TicketTableProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
        <p className="text-sm text-zinc-500 font-medium">Fila limpa!</p>
        <p className="text-xs text-zinc-600 mt-1">Nenhum chamado pendente nesta listagem.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800/60 bg-zinc-900/10">
      <table className="w-full text-left border-collapse min-w-150">
        <thead>
          <tr className="border-b border-zinc-800 text-xs font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-900/40">
            <th className="py-3.5 px-4 w-35">Protocolo</th>
            <th className="py-3.5 px-4">Assunto / Cliente</th>
            <th className="py-3.5 px-4 w-37.5">Status</th>
            <th className="py-3.5 px-4 w-32.5">Abertura</th>
            <th className="py-3.5 px-4 w-25 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/40 text-sm text-zinc-300">
          {data.map((ticket) => (
            /* Passamos o item completo e isolamos a lógica de cada linha */
            <TicketRow key={ticket.id} item={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  );
}