// src/components/features/chat/ChatBoxContainer.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/useChat";
import { formatarHora } from "@/shared/utils/chatHelpers";

interface Mensagem {
  id: string;
  conteudo: string;
  criadoEm: string;
  remetente?: {
    id: string;
    name: string; // 🌟 CORRIGIDO: Padronizado com o useCase e o backend
    role: "CLIENTE" | "TECNICO" | "ADMIN"; // 🌟 CORRIGIDO: Padronizado com o useCase e o backend
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

  // 🌟 MUDANÇA AQUI: Agora a referência aponta para a DIV CONTAINER das mensagens, não para o fim dela
  const containerMensagensRef = useRef<HTMLDivElement | null>(null);

  // 🌟 NOVA FUNÇÃO DE ROLAGEM INTERNA:
  const scrollToBottom = (behavior: "smooth" | "auto" = "smooth") => {
    const container = containerMensagensRef.current;
    if (container) {
      // scrollTop é a posição atual da rolagem.
      // Ao igualar ao scrollHeight (altura total interna), forçamos apenas essa caixa a ir para o chão.
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      });
    }
  };

  // Monitor de mensagens
  useEffect(() => {
    // No carregamento inicial usamos "auto" (instantâneo), nas novas usamos "smooth"
    const comportamento =
      todasAsMensagens.length <= historicoInicial.length ? "auto" : "smooth";
    scrollToBottom(comportamento);
  }, [todasAsMensagens.length]);

  const handleEnviar = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textoMensagem.trim()) return;

    enviarMensagem(textoMensagem);
    setTextoMensagem("");
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-125">
      {/* Cabeçalho do Chat */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-semibold text-sm text-zinc-200">
          Histórico de Conversação
        </h3>
      </div>

      {/* Lista de Mensagens */}
      {/* 🌟 MUDANÇA AQUI: Atribuímos a ref a esta div e removemos a div invisível antiga do final */}
      <div
        ref={containerMensagensRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
      >
        {todasAsMensagens.map((msg) => {
          const ehMinha = msg.remetente?.id === usuarioAtualId;

          // 🌟 Garantimos que a role seja tratada estritamente como um dos três tipos válidos
          const role =
            (msg.remetente?.role as "CLIENTE" | "TECNICO" | "ADMIN") ||
            "CLIENTE";

          // 🌟 Tipamos o objeto explicitamente para o TypeScript aceitar a indexação dinâmica
          const estilosPorRole: Record<
            "CLIENTE" | "TECNICO" | "ADMIN",
            { balao: string; badge: string }
          > = {
            CLIENTE: {
              balao: "bg-zinc-800 text-zinc-100 rounded-tl-none",
              badge: "text-zinc-500 bg-zinc-800/50 border-zinc-700",
            },
            TECNICO: {
              balao:
                "bg-emerald-950/80 text-emerald-100 border border-emerald-800/50 rounded-tl-none",
              badge: "text-emerald-400 bg-emerald-950/50 border-emerald-800",
            },
            ADMIN: {
              balao:
                "bg-amber-950/80 text-amber-100 border border-amber-800/50 rounded-tl-none",
              badge: "text-amber-400 bg-amber-950/50 border-amber-800",
            },
          };

          // Agora o TypeScript sabe que 'role' é uma chave legítima e segura!
          const estiloAtual = estilosPorRole[role];

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${ehMinha ? "items-end" : "items-start"}`}
            >
              <span className="text-xs text-zinc-500 mb-1 px-1">
                {msg.remetente?.name || "Sistema"} •{" "}
                {msg.remetente?.role || "SISTEMA"}
              </span>

              <span
                className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${estiloAtual.badge}`}
              >
                {role}
              </span>

              <div
                className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm ${
                  ehMinha
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-zinc-800 text-zinc-100 rounded-tl-none"
                }`}
              >
                {msg.conteudo}
              </div>
              <span className="text-[10px] text-zinc-500 mt-1 px-1">
                {formatarHora(msg.criadoEm)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Formulário de Envio */}
      <form
        onSubmit={handleEnviar}
        className="p-4 border-t border-zinc-800 flex gap-2"
      >
        <input
          type="text"
          value={textoMensagem}
          onChange={(e) => setTextoMensagem(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
