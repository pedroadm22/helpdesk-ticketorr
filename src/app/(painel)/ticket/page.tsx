import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

import { getCurrentUser } from "@/modules/auth/use-cases/get-current-user.use-case";
import { ListTicketUseCase } from "@/modules/tickets/use-cases/list-tickets.use-case";
import { TicketTable } from "@/components/features/ticket/TicketTable";
import { UserRole } from "@/shared/types/domain/user";

const listTicketUseCase = new ListTicketUseCase();

export default async function TicketsPage() {
  // 1. Obtém o usuário logado e sua role vinda do banco (public.users)
  const user = await getCurrentUser();

  // 2. Se não houver sessão ativa, redireciona para a tela de login
  if (!user) {
    redirect("/login");
  }

  const userRole = user.role as UserRole;

  // 3. Executa o Use Case com o ID e Role validados no Supabase/Drizzle
  const chamados = await listarTicketsUseCase({
    usuarioId: user.id,
    role: userRole,
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* Cabeçalho com Título e Botão Alinhados */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Gerenciamento de Chamados
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Painel de controle de incidentes para o perfil{" "}
            <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
              {userRole}
            </span>
          </p>
        </div>

        {/* Botão de Abrir Chamado */}
        <div>
          <Link
            href="/ticket/abrir-ticket"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-medium transition-all shadow-lg shadow-blue-600/15"
          >
            <Plus className="w-4 h-4" />
            Abrir Chamado
          </Link>
        </div>
      </header>

      {/* Tabela com a lista filtrada */}
      {chamados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
          <p className="text-sm text-zinc-500">Nenhum ticket encontrado para o seu perfil.</p>
        </div>
      ) : (
        <TicketTable tickets={chamados} />
      )}
    </div>
  );
}