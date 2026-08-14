// src/components/features/tickets/tickets-table.tsx

// 1. Defina/Atualize a interface das Props aceitando 'userRole' e aceitando o tipo flexível do Ticket
interface TicketsTableProps {
  tickets: any[]; // ou TicketDTO[]
  userRole: "ADMIN" | "TECHNICIAN" | "CLIENT";
}

// 2. Adicione 'userRole' na desestruturação dos parâmetros da função
export function TicketsTable({ tickets = [], userRole }: TicketsTableProps) {
  // Se o Drizzle estiver retornando o objeto aninhado [{ tickets: {...} }], desaninhamos aqui:
  const normalizedTickets = tickets.map((item) => (item.tickets ? item.tickets : item));

  if (normalizedTickets.length === 0) {
    return (
      <div className="p-8 text-center text-zinc-400 bg-zinc-900/40 rounded-xl border border-zinc-800">
        Nenhum chamado encontrado.
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50">
      <table className="w-full text-left text-sm text-zinc-300">
        <thead className="bg-zinc-900 border-b border-zinc-800 text-xs uppercase text-zinc-400">
          <tr>
            <th className="py-3 px-4">Chamado</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Prioridade</th>
            <th className="py-3 px-4">Atribuição</th>
            <th className="py-3 px-4 text-right">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800">
          {normalizedTickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-zinc-800/30">
              <td className="py-3 px-4">
                <div className="font-medium text-zinc-100">{ticket.title}</div>
                <div className="text-xs text-zinc-500 truncate max-w-xs">{ticket.description}</div>
              </td>
              <td className="py-3 px-4 text-xs">{ticket.status}</td>
              <td className="py-3 px-4 text-xs">{ticket.priority}</td>
              <td className="py-3 px-4 text-xs">
                {ticket.agentId ? (
                  <span className="text-emerald-400 font-medium">Atribuído</span>
                ) : (
                  <span className="text-amber-400 font-medium">Aguardando Técnico</span>
                )}
              </td>
              <td className="py-3 px-4 text-right">
                <a href={`/ticket/${ticket.id}`} className="text-xs text-emerald-400 hover:underline">
                  Ver detalhes
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}