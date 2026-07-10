// src/app/dashboard/page.tsx
import { auth } from "@/infrastructure/auth"; // Ajuste para o caminho real do seu arquivo do Better Auth
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { listarTicketsUseCase } from "@/modules/tickets/use-cases/ListarTicketUseCase";
import { TicketTable } from "@/components/features/ticket/TicketTable"; 

export default async function DashboardPage() {
  // 1. Captura a sessão do usuário de forma segura no servidor
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 2. Se o usuário não estiver autenticado, redireciona para a raiz/login
  if (!session) {
    redirect("/");
  }

  // 3. Executa o caso de uso injetando o ID e a Role obtidos da sessão
  const chamadosFiltrados = await listarTicketsUseCase({
    usuarioId: session.user.id,
    role: session.user.role as "CLIENTE" | "TECNICO" | "ADMIN",
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screen bg-zinc-950 text-zinc-100">
      
      {/* Cabeçalho da Dashboard */}
      <header className="flex justify-between items-center border-b border-zinc-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
            Fila de Atendimentos
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Olá, <span className="text-zinc-200 font-medium">{session.user.name}</span>. 
            Você está navegando com o perfil de{" "}
            <span className="text-blue-400 font-semibold uppercase text-xs tracking-wider bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
              {session.user.role}
            </span>
          </p>
        </div>
      </header>

      {/* 4. Lista ou Tabela de Chamados protegida */}
      {chamadosFiltrados.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-zinc-800 rounded-xl bg-zinc-900/10">
          <p className="text-sm text-zinc-500">Nenhum chamado encontrado para o seu perfil.</p>
        </div>
      ) : (
        <TicketTable tickets={chamadosFiltrados} />
      )}
      
    </div>
  );
}