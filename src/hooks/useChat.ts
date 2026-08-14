// src/hooks/useChat.ts
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseChatProps {
  ticketId: string;
  usuarioAtualId: string; // 🌟 Certifique-se de receber o ID aqui no hook
}

export function useChat({ ticketId, usuarioAtualId }: UseChatProps) {
  const [mensagens, setMensagens] = useState<any[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!ticketId || !usuarioAtualId) return;

    socketRef.current = io("http://localhost:3001", {
      auth: {
        usuarioId: usuarioAtualId, // 🔑 O middleware do servidor vai ler exatamente este campo!
      },
    });

    // Evento 1: Assim que conecta física e estavelmente, entra na sala do ticket
    socketRef.current.on("connect", () => {
      console.log("🔌 Conectado ao servidor de chat de forma segura!");
      
      // Entra na sala específica deste chamado
      socketRef.current?.emit("entrar_chamado", { ticketId });
    });

    // Evento 2: Escuta novas mensagens vindas do servidor
    socketRef.current.on("receber_mensagem", (novaMensagem: any) => {
      setMensagens((mensagensAtuais) => [...mensagensAtuais, novaMensagem]);
    });

    // Evento de erro de autenticação (Caso o middleware barre o usuário)
    socketRef.current.on("connect_error", (error) => {
      console.error("❌ Erro de conexão/autenticação no Socket:", error.message);
    });

    // Limpeza ao sair da página ou mudar de ticket
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [ticketId, usuarioAtualId]);

  // Função para o formulário disparar o envio
  const enviarMensagem = (conteudo: string) => {
    if (!conteudo.trim() || !socketRef.current) return;

    const payload = {
      ticketId,
      remetenteId: usuarioAtualId, // Mantém o envio do ID para o UseCase salvar no SQLite
      conteudo: conteudo.trim(),
    };

    socketRef.current.emit("enviar_mensagem", payload, (response: any) => {
      if (response?.status === "error") {
        console.error("Erro ao entregar mensagem:", response.message);
      }
    });
  };

  return {
    mensagens,
    setMensagens,
    enviarMensagem,
  };
}