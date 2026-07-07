// src/components/features/chat/ChatBoxContainer.tsx
"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat"; // Ajuste o caminho do seu hook

interface Mensagem {
  id: string;
  conteudo: string;
  criadoEm: string;
  remetente?: {
    id: string;
    nome: string;
    perfil: "CLIENTE" | "TECNICO" | "ADMIN";
  };
}

interface ChatBoxContainerProps {
  ticketId: string;
  usuarioAtualId: string; // ID legítimo vindo da sessão do Better Auth via page.tsx
  historicoInicial: Mensagem[];
}

export function ChatBoxContainer({
  ticketId,
  usuarioAtualId,
  historicoInicial,
}: ChatBoxContainerProps) {
  const [textoMensagem, setTextoMensagem] = useState("");

  // 🌟 MUDANÇA CRÍTICA: Repassando o usuarioAtualId para o hook injetar no auth do Socket
  const { mensagens, enviarMensagem } = useChat({
    ticketId,
    usuarioAtualId,
  });

  // Combina o histórico inicial do SSR com as novas mensagens em tempo real do Socket
  const todasAsMensagens = [...historicoInicial, ...mensagens];

  const handleEnviar = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textoMensagem.trim()) return;

    enviarMensagem(textoMensagem);
    setTextoMensagem(""); // Limpa o input após o envio
  };

  return (
    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col h-125">
      {/* Cabeçalho do Chat */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="font-semibold text-sm text-zinc-200">Histórico de Conversação</h3>
      </div>

      {/* Lista de Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {todasAsMensagens.map((msg) => {
          // 🌟 PROTEÇÃO: Verifica se a mensagem é sua usando optional chaining
          const ehMinha = msg.remetente?.id === usuarioAtualId;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${ehMinha ? "items-end" : "items-start"}`}
            >
              {/* Nome e Role do Remetente */}
              <span className="text-xs text-zinc-500 mb-1 px-1">
                {msg.remetente?.nome || "Sistema"} • {msg.remetente?.perfil || "SISTEMA"}
              </span>

              {/* Balão da Mensagem */}
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2.5 text-sm ${
                  ehMinha
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-zinc-800 text-zinc-100 rounded-tl-none"
                }`}
              >
                {msg.conteudo}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formulário de Envio */}
      <form onSubmit={handleEnviar} className="p-4 border-t border-zinc-800 flex gap-2">
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