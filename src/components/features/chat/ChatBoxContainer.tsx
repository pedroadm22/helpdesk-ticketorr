"use client";

import { useChat } from "@/hooks/useChat";
import { ChatBoxView } from "./ChatBoxView";

interface ChatBoxContainerProps {
  ticketId: string;
  usuarioAtualId: string;
  historicoInicial: any[];
}

export function ChatBoxContainer({ ticketId, usuarioAtualId, historicoInicial }: ChatBoxContainerProps) {
  // Toda a lógica de WebSocket e estados fica isolada aqui
  const { mensagens, enviarMensagem } = useChat(ticketId, usuarioAtualId, historicoInicial);

  return (
    <ChatBoxView 
      mensagens={mensagens} 
      usuarioAtualId={usuarioAtualId} 
      onEnviarMensagem={enviarMensagem} 
    />
  );
}