// src/components/features/ticket-details/ticket-chat.tsx
"use client";

import { useEffect, useState, SubmitEvent } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { cn } from "@/shared/utils/cn";

interface Message {
  id: string;
  conteudo: string;
  criadoEm: string;
  remetente: {
    id: string;
    name: string;
    role: string;
  };
}

interface TicketChatProps {
  ticketId: string;
  currentUser?: {
    id: string;
    name: string | null; // <--- Alterado para aceitar null
    role: string;
  };
  initialMessages?: Message[];
}

export function TicketChat({ ticketId, currentUser, initialMessages = [] }: TicketChatProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputContent, setInputContent] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Proteção caso o usuário ainda não esteja carregado
    if (!currentUser?.id) return;

    // Conecta no servidor WebSocket isolado (porta 3001)
    const socketInstance = io("http://localhost:3001", {
      auth: {
        usuarioId: currentUser.id,
      },
    });

    setSocket(socketInstance);

    // Entra na sala específica do chamado
    socketInstance.emit("entrar_chamado", { ticketId });

    // Escuta novas mensagens em tempo real
    socketInstance.on("receber_mensagem", (novaMensagem: Message) => {
      setMessages((prev) => [...prev, novaMensagem]);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [ticketId, currentUser?.id]);

  const handleSendMessage = (e: SubmitEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || !socket || !currentUser?.id) return;

    const payload = {
      ticketId,
      userId: currentUser.id,
      conteudo: inputContent,
    };

    socket.emit("enviar_mensagem", payload, (response: any) => {
      if (response?.status === "ok") {
        setInputContent("");
      } else {
        console.error("Erro ao enviar mensagem:", response?.message);
      }
    });
  };

  // Se o usuário não estiver carregado, exibe um estado de carregamento seguro
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[600px] bg-zinc-950/80 border border-zinc-800 rounded-2xl text-zinc-500 text-xs">
        Carregando dados do chat...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-zinc-950/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
      {/* Header do Chat */}
      <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/40">
        <h3 className="font-semibold text-zinc-100 text-sm">Histórico de Conversa</h3>
        <p className="text-xs text-zinc-400">Mensagens em tempo real</p>
      </div>

      {/* Lista de Mensagens */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-zinc-500 text-xs">
            Nenhuma mensagem neste chamado ainda. Inicie a conversa abaixo.
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.remetente.id === currentUser.id;

            return (
              <div
                key={msg.id}
                className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-medium text-zinc-400">{msg.remetente.name}</span>
                  <span className="text-[10px] text-zinc-600">
                    {new Date(msg.criadoEm).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <div
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                    isMe
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none"
                  )}
                >
                  {msg.conteudo}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input de Envio */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-zinc-800 bg-zinc-900/40 flex items-center gap-3">
        <Input
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-emerald-500"
        />
        <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-500 text-white shrink-0">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}