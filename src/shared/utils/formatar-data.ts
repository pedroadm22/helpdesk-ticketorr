// src/shared/utils/formatar-data.ts

export function formatarDataCriacao(data: Date | string | null | undefined): string {
  if (!data) return "Data não informada";

  const dataObj = typeof data === "string" ? new Date(data) : data;

  // Formata para o padrão brasileiro: DD/MM/AAAA às HH:mm
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(dataObj);
}