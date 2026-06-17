// src/components/features/chat/MensagemLista.tsx
"use client";

interface Mensagem {
  id: string;
  texto: string;
  remetenteId?: string; // ID plano do Socket/Banco
  remetente?: {
    // Objeto aninhado do Join
    id: string;
    nome: string;
  };
}

interface MensagemListaProps {
  mensagens: Mensagem[];
  usuarioAtualId: string;
}

export function MensagemLista({
  mensagens,
  usuarioAtualId,
}: MensagemListaProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {mensagens.map((msg) => {
        // 🟢 CORREÇÃO: Verifica se existe o id dentro do objeto remetente OU usa o remetenteId plano
        const ehMinha =
          msg.remetente?.id === usuarioAtualId ||
          msg.remetenteId === usuarioAtualId;

        return (
          <div
            key={msg.id}
            className={`flex flex-col ${ehMinha ? "items-end" : "items-start"}`}
          >
            {/* O balão de mensagem */}
            <div
              className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${
                ehMinha
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-zinc-800 text-zinc-100 rounded-tl-none"
              }`}
            >
              {/* 🟢 CORREÇÃO: Tenta ler .texto, se não existir, lê .conteudo */}
              <p className="leading-relaxed wrap-break-word">
                {msg.texto || (msg as any).conteudo}
              </p>
            </div>

            {/* Nome/Metadados sutil embaixo do balão (opcional) */}
            <span className="text-[10px] text-zinc-500 mt-1 px-1">
              {ehMinha ? "Você" : (msg.remetente?.nome ?? "Suporte")}
            </span>
          </div>
        );
      })}
    </div>
  );
}
