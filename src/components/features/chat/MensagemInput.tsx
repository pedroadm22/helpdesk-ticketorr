"use client";

import { useMensagemForm } from "@/hooks/useMessegeForm";
import { capturarEnvioTeclado } from "@/shared/utils/chatHelpers";

interface MensagemInputProps {
  onEnviar: (conteudo: string) => void;
}

export function MensagemInput({ onEnviar }: MensagemInputProps) {
  // Toda a lógica de estado do formulário foi terceirizada
  const { texto, mudarTexto, lidarComEnvio, podeEnviar } = useMensagemForm(onEnviar);

  return (
    <form onSubmit={lidarComEnvio} className="p-3 border-t border-zinc-800 bg-zinc-900/30 flex items-end gap-2">
      <textarea
        value={texto}
        onChange={(e) => mudarTexto(e.target.value)}
        onKeyDown={(e) => capturarEnvioTeclado(e, lidarComEnvio)}
        placeholder="Digite sua mensagem para o suporte..."
        rows={1}
        className="flex-1 max-h-24 min-h-[40px] resize-none rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        disabled={!podeEnviar}
        className="h-10 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium text-sm rounded-lg transition-colors shadow-md"
      >
        Enviar
      </button>
    </form>
  );
}