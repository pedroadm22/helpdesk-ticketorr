// src/components/features/chat/ChatBoxContainer.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "@/hooks/useChat";
import { ArrowUp } from "lucide-react"; // 🌟 NOVO: Ícone minimalista para o botão de envio
import { formatarHora } from "@/shared/utils/chatHelpers";

interface Mensagem {
  id: string;
  conteudo: string;
  criadoEm: string;
  remetente?: {
    id: string;
    name: string;
    role: "CLIENTE" | "TECNICO" | "ADMIN";
  };
}

interface ChatBoxContainerProps {
  ticketId: string;
  usuarioAtualId: string;
  historicoInicial: Mensagem[];
}

export function ChatBoxContainer({
  ticketId,
  usuarioAtualId,
  historicoInicial,
}: ChatBoxContainerProps) {
  const [textoMensagem, setTextoMensagem] = useState("");

  const { mensagens, enviarMensagem } = useChat({
    ticketId,
    usuarioAtualId,
  });

  const todasAsMensagens = [...historicoInicial, ...mensagens];
  const containerMensagensRef = useRef<HTMLDivElement | null>(null);

  // Rolagem interna automática da caixa de mensagens
  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    const container = containerMensagensRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    const comportamento =
      todasAsMensagens.length <= historicoInicial.length ? "auto" : "smooth";
    scrollToBottom(comportamento);
  }, [todasAsMensagens.length]);

  const handleEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textoMensagem.trim()) return;

    enviarMensagem(textoMensagem);
    setTextoMensagem("");
  };

  return (
    // 🌟 Adicionado 'overflow-hidden' para que os balões fiquem perfeitamente cortados atrás do efeito de vidro nos cantos arredondados
    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-125 overflow-hidden relative">
      {/* 🌟 CABEÇALHO COM GLASSMORPHISM */}
      <div className="p-4 border-b border-zinc-800/60 bg-zinc-900/60 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between">
        <h3 className="font-semibold text-sm text-zinc-200">
          Histórico de Conversação
        </h3>
        <div className="flex items-center gap-1.5 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
            Canal Ativo
          </span>
        </div>
      </div>

      <div 
  ref={containerMensagensRef}
  className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-zinc-950/10"
>
  {todasAsMensagens.map((msg) => {
    const ehMinha = msg.remetente?.id === usuarioAtualId;
    const role = (msg.remetente?.role as "CLIENTE" | "TECNICO" | "ADMIN") || "CLIENTE";

    // Voltamos com o dicionário de cores discretas para os textos dos metadados
    const coresPorRole = {
      CLIENTE: "text-zinc-500",
      TECNICO: "text-emerald-500 font-semibold",
      ADMIN: "text-amber-500 font-semibold",
    }[role];

    return (
      <div
        key={msg.id}
        // Alinha o bloco inteiro na direita (se for meu) ou esquerda (se for dos outros)
        className={`flex flex-col ${ehMinha ? "items-end" : "items-start"} w-full`}
      >
        {/* ESTRUTURA DO BALÃO */}
        <div
          className={`max-w-[75%] rounded-lg px-3.5 py-2 text-sm break-words shadow-sm border ${
            ehMinha
              ? "bg-blue-600 border-blue-500 text-white rounded-tr-none"
              : "bg-zinc-800 border-zinc-700/50 text-zinc-100 rounded-tl-none"
          }`}
        >
          {/* whitespace-pre-wrap mantido para respeitar quebras de linha legítimas */}
          <span className="whitespace-pre-wrap">{msg.conteudo}</span>
        </div>

        {/* 🌟 RODAPÉ DISCRETO ABAIXO DO BALÃO */}
        <div 
          className={`flex items-center gap-1 mt-1 px-1 text-[10px] text-zinc-500 select-none ${
            ehMinha ? "justify-end" : "justify-start"
          }`}
        >
          <span className="font-medium text-zinc-400">
            {ehMinha ? "Você" : msg.remetente?.name || "Sistema"}
          </span>
          <span>•</span>
          <span className={coresPorRole}>
            {role}
          </span>
          <span>•</span>
          <span>
            {formatarHora(msg.criadoEm)}
          </span>
        </div>
      </div>
    );
  })}
</div>

      {/* 🌟 FORMULÁRIO DE ENVIO COM GLASSMORPHISM */}
      <form
        onSubmit={handleEnviar}
        className="p-4 border-t border-zinc-800/60 bg-zinc-900/60 backdrop-blur-md flex gap-2 sticky bottom-0 z-10"
      >
        <input
          type="text"
          value={textoMensagem}
          onChange={(e) => setTextoMensagem(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
          className="flex-1 bg-zinc-950/80 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600/80 transition-colors"
        />
        {/* Botão premium: Desabilitado se vazio, ícone substitui o texto cansativo */}
        <button
          type="submit"
          disabled={!textoMensagem.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white p-2.5 rounded-lg transition-all flex items-center justify-center aspect-square"
          title="Enviar Mensagem"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5]" />
        </button>
      </form>
    </div>
  );
}
