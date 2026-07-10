// src/app/ticket/page.tsx
import { auth } from "@/infrastructure/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link"; // 🌟 Importado para o botão
import { Plus } from "lucide-react"; // Ícone elegante
import { listarTicketsUseCase } from "@/modules/tickets/use-cases/ListarTicketUseCase";
import { TicketTable } from "@/components/features/ticket/TicketTable";
import { UserRole } from '@/shared/types/domain/user';

export default async function TicketsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/");
  }

  const userRole = session.user.role as UserRole;

  const chamados = await listarTicketsUseCase({
    usuarioId: session.user.id,
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

        {/* 🌟 BOTÃO DE ABRIR CHAMADO ADICIONADO DE VOLTA */}
        <div>
          <Link
            href="/ticket/abrir-ticket" // ⚠️ Ajuste aqui para a sua rota real de criar chamado
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