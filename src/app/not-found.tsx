// src/app/not-found.tsx
"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        
        {/* Ícone de Alerta Premium */}
        <div className="inline-flex p-4 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
          <ShieldAlert className="w-10 h-10 text-amber-500 animate-pulse" />
        </div>

        {/* Textos */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">
            Conteúdo Indisponível
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            O chamado que você tentou acessar não existe, foi removido ou você não possui permissões comerciais para visualizá-lo.
          </p>
        </div>

        {/* Linha Divisória */}
        <div className="border-t border-zinc-900" />

        {/* Botão de Retorno */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm font-medium transition-all group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            Voltar para a Dashboard
          </Link>
        </div>
        
      </div>
    </div>
  );
}