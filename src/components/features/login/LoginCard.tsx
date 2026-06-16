// src/modules/auth/components/LoginCard.tsx
"use client";

import Link from "next/link";
import { useLoginForm } from "@/hooks/useLoginForm";
import { LoginHeader } from "./LoginHeader";
import { LoginInput } from "./LoginInput";

export function LoginCard() {
  // 🟢 Injeta toda a lógica isolada no componente visual
  const { email, setEmail, senha, setSenha, carregando, handleLoginSubmit } = useLoginForm();

  return (
    <div className="w-full max-w-md space-y-6 bg-zinc-900/30 border border-zinc-900 p-8 rounded-2xl backdrop-blur-md shadow-2xl">
      <LoginHeader />

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <LoginInput
          id="email"
          label="E-mail corporativo"
          type="email"
          placeholder="nome@empresa.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={carregando}
        />

        <LoginInput
          id="senha"
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={carregando}
          rightElement={
            <a href="#" className="text-xs text-blue-400 hover:underline">
              Esqueceu a senha?
            </a>
          }
        />

        <button
          type="submit"
          disabled={carregando}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium text-sm rounded-xl transition-colors shadow-lg shadow-blue-600/10 flex items-center justify-center gap-2"
        >
          {carregando ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Autenticando...
            </>
          ) : (
            "Entrar no Painel"
          )}
        </button>
      </form>

      <div className="text-center text-xs text-zinc-500 border-t border-zinc-900 pt-4">
        Não tem uma conta?{" "}
        <Link href="#" className="text-blue-400 hover:underline font-medium">
          Solicite acesso ao suporte
        </Link>
      </div>
    </div>
  );
}