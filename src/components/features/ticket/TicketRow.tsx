import { TicketFilaItemDto } from "@/modules/tickets/dto/ListaFilaTicketsDto";
import { StatusBadge } from "./StatusBadge";
import Link from "next/link";
// Se criar o PriorityBadge, importe-o aqui

interface TicketRowProps {
  item: TicketFilaItemDto;
}

export function TicketRow({ item }: TicketRowProps) {
  return (
    <tr className="hover:bg-zinc-800/10 transition-colors group">
      {/* Protocolo */}
      <td className="py-3.5 px-4 font-mono text-xs font-bold text-zinc-400">
        <span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded whitespace-nowrap group-hover:border-zinc-700 transition-colors">
          {item.protocolo}
        </span>
      </td>

      {/* Assunto e Cliente */}
      <td className="py-3.5 px-4">
        <div className="font-medium text-zinc-200 truncate group-hover:text-zinc-100 transition-colors">
          {item.titulo}
        </div>
        <div className="text-xs text-zinc-500 truncate mt-0.5">
          {item.clienteNome}
        </div>
      </td>

      {/* Status */}
      <td className="py-3.5 px-4">
        <StatusBadge statusId={item.statusId} />
      </td>

      {/* Data */}
      <td className="py-3.5 px-4 text-xs text-zinc-400">{item.dataCriacao}</td>

      {/* Ações */}
      <td className="py-3.5 px-4 text-right">
        <Link
          href={`/tickets/${item.id}`}
          className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/5 hover:bg-blue-500/10 border border-blue-500/10 px-2.5 py-1 rounded-md"
        >
          Gerenciar
        </Link>
      </td>
    </tr>
  );
}
