// src/app/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // É uma boa prática logar o erro em serviços de monitoramento (como Sentry)
    console.error("Erro capturado pela rota global:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        
        {/* Ícone de Erro Crítico */}
        <div className="inline-flex p-4 rounded-full bg-red-950/20 border border-red-900/30 text-red-400">
          <AlertTriangle className="w-10 h-10" />
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-zinc-100 tracking-tight">
            Algo deu errado no servidor
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Ocorreu uma falha inesperada ao processar sua solicitação. Nossa equipe de infraestrutura já foi notificada.
          </p>
        </div>

        {/* Botão de Tentar Novamente */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>

      </div>
    </div>
  );
}