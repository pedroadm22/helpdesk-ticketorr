// src/app/tickets/novo/page.tsx
import { CriarTicketForm } from "@/components/features/chamados/CriarTicketForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NovoChamadoPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-300">
      
      {/* Botão de Voltar sutil para melhorar a experiência do usuário */}
      <div className="flex items-center">
        <Link
          href="/chamados"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          <span>Voltar para a fila</span>
        </Link>
      </div>

      {/* Cabeçalho de Identificação da Tela */}
      <div className="space-y-1.5 border-b border-zinc-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-100">
          Abrir Novo Chamado
        </h1>
        <p className="text-sm text-zinc-400">
          Registre o incidente detalhadamente. Isso acionará automaticamente os contadores de SLA com base na urgência selecionada.
        </p>
      </div>
      
      {/* Container Card onde o formulário modular é renderizado */}
      <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-6 shadow-md backdrop-blur-sm">
        <CriarTicketForm />
      </div>
    </div>
  );
}