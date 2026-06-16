"use client";

import { useEffect, useRef } from "react";
import { formatarHora } from "@/shared/utils/chatHelpers"; // 🟢 Importando a função pura

interface MensagemListaProps {
  mensagens: any[];
  usuarioAtualId: string;
}

export function MensagemLista({ mensagens, usuarioAtualId }: MensagemListaProps) {
  const fimDoChatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fimDoChatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {mensagens.map((msg) => {
        const ehMinha = msg.remetente.id === usuarioAtualId;

        return (
          <div key={msg.id} className={`flex flex-col ${ehMinha ? "items-end" : "items-start"}`}>
            <span className="text-xs text-zinc-500 mb-1 px-1">
              {msg.remetente.nome} • <span className="text-[10px] opacity-70">{msg.remetente.perfil}</span>
            </span>

            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${ehMinha ? "bg-blue-600 text-white" : "bg-zinc-800 text-zinc-100"}`}>
              <p className="whitespace-pre-wrap wrap-break-word">{msg.conteudo}</p>
              
              {/* 🟢 Uso da função utilitária limpa fora do escopo do componente */}
              <span className="block text-[10px] mt-1 text-right opacity-60">
                {formatarHora(msg.criadoEm)}
              </span>
            </div>
          </div>
        );
      })}
      <div ref={fimDoChatRef} />
    </div>
  );
}