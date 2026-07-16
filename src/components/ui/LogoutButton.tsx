"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/infrastructure/auth/auth-client"; // Ajuste o caminho do seu cliente do Better Auth

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      
      // Executa o logout limpando a sessão no Better Auth
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login"); // Redireciona para a página de login
            router.refresh();      // Atualiza o estado das rotas do Next.js
          },
        },
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
      title="Sair do sistema"
      type="button"
    >
      <LogOut className="h-4 w-4" />
      <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
    </button>
  );
}