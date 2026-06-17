// src/modules/chat/hooks/useMensagemForm.ts
import { useState, FormEvent } from "react";

export function useMensagemForm(onEnviar: (conteudo: string) => void) {
  const [texto, setTexto] = useState("");

  const lidarComEnvio = (e?: FormEvent) => {
    e?.preventDefault();
    if (!texto.trim()) return;

    onEnviar(texto);
    setTexto(""); // Limpa o input
  };

  const mudarTexto = (valor: string) => setTexto(valor);

  return {
    texto,
    mudarTexto,
    lidarComEnvio,
    podeEnviar: texto.trim().length > 0
  };
}