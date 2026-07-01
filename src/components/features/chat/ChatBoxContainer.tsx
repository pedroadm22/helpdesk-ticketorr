"use client";

import { useState } from "react";
import { useChat } from "@/hooks/useChat"; // Ajuste o caminho do hook se necessário
import { Send } from "lucide-react"; // Ícone para o botão de enviar

interface Mensagem {
  id: string;
  conteudo: string;
  criadoEm: Date | string;
  remetente: {
    id: string;
    nome: string;
    perfil: "CLIENTE" | "TECNICO" | "ADMIN";
  };
}

interface ChatBoxContainerProps {
  ticketId: string;
  usuarioAtualId: string; // 🌟 Recebido dinamicamente da página (Better Auth)
  historicoInicial: Mensagem[];
}

export function ChatBoxContainer({
  ticketId,
  usuarioAtualId,
  historicoInicial,
}: ChatBoxContainerProps) {
  // 1. Conecta ao Hook injetando o ID real do usuário autenticado
  const { mensagens, enviarMensagem } = useChat(ticketId, usuarioAtualId, historicoInicial);
  const [novoConteudo, setNovoConteudo] = useState("");

  // 2. Trata o envio do formulário de chat
  const handleEnviar = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!novoConteudo.trim()) return;

    enviarMensagem(novoConteudo);
    setNovoConteudo(""); // Limpa o campo de texto após o envio
  };

  return (
    <div className="flex flex-col h-125 w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      {/* Topo do Chat */}
      <div className="bg-zinc-950 px-4 py-3 border-b border-zinc-800">
        <h3 className="text-sm font-semibold text-zinc-200">Histórico de Conversação</h3>
      </div>

      {/* Área de Mensagens de Rolagem */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensagens.length === 0 ? (
          <div className="flex items-center justify-center h-full text-zinc-500 text-sm">
            Nenhuma mensagem por aqui ainda. Comece a conversa!
          </div>
        ) : (
          mensagens.map((msg) => {
            // Verifica se a mensagem foi enviada pelo usuário logado no momento
            const ehMinha = msg.remetente.id == usuarioAtualId;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${ehMinha ? "items-end" : "items-start"}`}
              >
                <span className="text-xs text-zinc-500 mb-1 px-1">
                  {msg.remetente.nome} • {msg.remetente.perfil}
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
              </div>
            );
          })
        )}
      </div>

      {/* Caixa de Entrada (Formulário) */}
      <form onSubmit={handleEnviar} className="p-3 bg-zinc-950 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          value={novoConteudo}
          onChange={(e) => setNovoConteudo(e.target.value)}
          placeholder="Digite sua mensagem aqui..."
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!novoConteudo.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}