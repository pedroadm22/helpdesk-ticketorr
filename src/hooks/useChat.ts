"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";

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

export function useChat(ticketId: string, usuarioAtualId: string, historicoInicial: Mensagem[]) {
  const [mensagens, setMensagens] = useState<Mensagem[]>(historicoInicial);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // 1. Conecta ao servidor dedicado de Sockets
    socketRef.current = io("http://localhost:3001");

    // 2. Avisa ao servidor para entrar na sala deste ticket específico
    socketRef.current.emit("entrar_chamado", { ticketId });

    // 3. Escuta quando o servidor propaga uma nova mensagem
    socketRef.current.on("receber_mensagem", (novaMensagem: Mensagem) => {
      setMensagens((prev) => [...prev, novaMensagem]);
    });

    // Limpa a conexão quando o usuário sai da tela do chamado
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [ticketId]);

  // 4. Função para disparar uma nova mensagem para o Back-end
  const enviarMensagem = (conteudo: string) => {
    if (!conteudo.trim() || !socketRef.current) return;

    const payload = {
      ticketId,
      remetenteId: usuarioAtualId,
      conteudo: conteudo.trim(),
    };

    // Dispara o evento via WebSocket
    socketRef.current.emit("enviar_mensagem", payload, (response: any) => {
      if (response?.status === "error") {
        console.error("Erro ao entregar mensagem:", response.message);
        // Aqui você poderia colocar um estado de erro na tela se quisesse
      }
    });
  };

  return { mensagens, enviarMensagem };
}