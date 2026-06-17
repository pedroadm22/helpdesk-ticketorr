// Definição das propriedades que o componente precisa receber
interface PriorityBadgeProps {
  prioridadeId: number; // ID vinda do banco de dados (1, 2, 3 ou 4)
  nome?: string;        // Nome amigável vindo do banco (Ex: "Alta")
}

export function PriorityBadge({ prioridadeId, nome }: PriorityBadgeProps) {
  // Dicionário de estilos do Tailwind baseado estritamente na ID da prioridade
  const styles: Record<number, string> = {
    1: "bg-zinc-800 text-zinc-400 border-zinc-700",              // 1 = Baixa (Cinza discreto)
    2: "bg-blue-500/10 text-blue-400 border-blue-500/20",        // 2 = Média (Azul)
    3: "bg-amber-500/10 text-amber-400 border-amber-500/20",      // 3 = Alta (Amarelo/Laranja)
    4: "bg-red-600/20 text-red-500 border-red-600/30 font-bold animate-pulse", // 4 = Crítica (Vermelho piscando)
  };

  // Se vir uma ID que não conhecemos, aplicamos o estilo padrão (Baixa)
  const classeAplicada = styles[prioridadeId] || styles[1];

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border ${classeAplicada}`}>
      {nome || "Baixa"}
    </span>
  );
}