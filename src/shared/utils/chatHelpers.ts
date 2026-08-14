// src/modules/chat/utils/chatHelpers.ts

/**
 * Formata uma data ou string ISO para o formato de hora local HH:MM
 */
export function formatarHora(data: Date | string): string {
  return new Date(data).toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
}

/**
 * Filtra o clique do teclado para enviar com Enter, mas permite quebra de linha com Shift+Enter
 */
export function capturarEnvioTeclado(
  e: React.KeyboardEvent<HTMLTextAreaElement>, 
  aoEnviar: () => void
) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    aoEnviar();
  }
}