function formatarHora(isoString: string | Date): string {
  try {
    const data = new Date(isoString);
    
    // Retorna apenas "HH:MM" no formato de 24h brasileiro
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(data);
  } catch (error) {
    return "";
  }
}