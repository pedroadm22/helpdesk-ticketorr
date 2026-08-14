"use client";

import { MensagemLista } from "./MensagemLista";
import { MensagemInput } from "./MensagemInput";

interface ChatBoxViewProps {
  mensagens: any[];
  usuarioAtualId: string;
  onEnviarMensagem: (conteudo: string) => void;
}

export function ChatBoxView({ mensagens, usuarioAtualId, onEnviarMensagem }: ChatBoxViewProps) {
  return (
    <div className="flex flex-col h-[500px] w-full max-w-2xl border border-zinc-800 bg-zinc-950 rounded-xl overflow-hidden shadow-2xl">
      {/* Cabeçalho do Chat */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">Atendimento em Tempo Real</h3>
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>

      {/* Lista de Mensagens Balão (UI Pura) */}
      <MensagemLista mensagens={mensagens} usuarioAtualId={usuarioAtualId} />

      {/* Input de Texto (UI Pura) */}
      <MensagemInput onEnviar={onEnviarMensagem} />
    </div>
  );
}