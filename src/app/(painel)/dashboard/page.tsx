"@/infrastructure/supabase/server"// src/app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { createClient } from "@/infrastructure/supabase/server"; // Ajuste o caminho para onde fica seu createServerClient

export default async function DashboardPage() {
  // 1. Instancia o cliente do Supabase no servidor
  const supabase = await createClient();

  // 2. Obtém os dados do usuário autenticado diretamente no servidor
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 3. Se não houver usuário logado ou a sessão for inválida, redireciona para o login
  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="p-6 space-y-6">
      <header className="flex justify-between items-center pb-4 border-b">
        <div>
          <h1 className="text-2xl font-bold">Painel de Atendimento</h1>
          <p className="text-sm text-muted-foreground">
            Bem-vindo(a), <span className="font-semibold">{user.email}</span>
          </p>
        </div>
      </header>

      {/* Conteúdo do Dashboard / Lista de Chamados */}
      <main>
        {/* Aqui iremos renderizar os componentes da lista de tickets */}
      </main>
    </div>
  );
}