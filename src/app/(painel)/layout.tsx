// src/app/(painel)/layout.tsx

import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { Sidebar } from "@/components/layout/Sidebar";

export default async function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Busca o usuário autenticado no servidor
  const user = await getCurrentUserUseCase();

  // 2. Se não houver usuário logado, redireciona para a tela de login
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      {/* Sidebar que filtra as rotas conforme a Role (CLIENT, TECHNICIAN ou ADMIN) */}
      <Sidebar userRole={user.role} />

      {/* Área onde as páginas do painel (/ticket, /dashboard, etc.) serão renderizadas */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}