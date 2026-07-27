// src/components/features/tickets/ticket-chat.tsx
"use client";

import { useState } from "react";
import { Send, MessageSquare, Loader2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/shared/utils/cn";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "CLIENT" | "TECHNICIAN" | "ADMIN";
  content: string;
  createdAt: Date;
}

interface TicketChatProps {
  ticketId: string;
  currentUser: {
    id: string;
    name: string | null; // 👈 Aceita null para bater com o CurrentUserDTO
    role: "CLIENT" | "TECHNICIAN" | "ADMIN";
  };
}

export function TicketChat({ ticketId, currentUser }: TicketChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    // Exemplo de estado inicial/mock para montar a interface
    {
      id: "1",
      senderId: "system",
      senderName: "Sistema",
      senderRole: "ADMIN",
      content: "Chamado aberto com sucesso. Aguarde o atendimento do técnico.",
      createdAt: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);

    // Adiciona otimisticamente na UI (depois conectamos com a Server Action/WebSocket)
    const tempMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      senderName: currentUser.name || "Você",
      senderRole: currentUser.role,
      content: newMessage.trim(),
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempMsg]);
    setNewMessage("");
    setIsSending(false);
  };

  return (
    <div className="flex flex-col h-[520px] bg-zinc-950/80 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Topo do Chat */}
      <div className="p-4 border-b border-zinc-800/80 bg-zinc-900/50 flex items-center gap-2">
        <MessageSquare className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-zinc-200">
          Histórico de Comunicação
        </h3>
      </div>

      {/* Lista de Mensagens */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={cn("flex flex-col max-w-[80%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[11px] font-medium text-zinc-400">{msg.senderName}</span>
                <span className="text-[10px] text-zinc-600">
                  {new Date(msg.createdAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={cn(
                  "p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-md",
                  isMe
                    ? "bg-emerald-600 text-white rounded-tr-none"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none"
                )}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input de Envio */}
      <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/60 border-t border-zinc-800/80 flex gap-2 items-end">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Escreva sua resposta..."
          rows={2}
          className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/40 resize-none min-h-[50px] text-sm"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
        />

        <Button
          type="submit"
          disabled={!newMessage.trim() || isSending}
          className="bg-emerald-600 hover:bg-emerald-500 text-white h-[50px] px-4 cursor-pointer disabled:opacity-50"
        >
          {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
}