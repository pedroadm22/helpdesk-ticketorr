// Definição das propriedades do Status
interface StatusBadgeProps {
  statusId: number; // ID vinda do banco de dados (1, 2, 3 ou 4)
  nome?: string;    // Nome amigável do status (Ex: "Em Atendimento")
}

export function StatusBadge({ statusId, nome }: StatusBadgeProps) {
  // Dicionário de estilos do Tailwind baseado estritamente na ID do Status
  const styles: Record<number, string> = {
    1: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", // 1 = Aberto (Verde)
    2: "bg-blue-500/10 text-blue-400 border-blue-500/20",          // 2 = Em Atendimento (Azul)
    3: "bg-amber-500/10 text-amber-400 border-amber-500/20",        // 3 = Pendente (Amarelo)
    4: "bg-zinc-800 text-zinc-500 border-zinc-700 line-through",    // 4 = Resolvido (Cinza riscado)
  };

  const classeAplicada = styles[statusId] || styles[1];

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${classeAplicada}`}>
      {nome || "Aberto"}
    </span>
  );
}