import React from "react";

// Definição clara da interface de Props para o componente global
interface MetricCardProps {
  title: string;              // Ex: "Tempo Médio de Resolução"
  count: string | number;     // Suporta tanto números puros (14) quanto strings ("98.5%")
  icon: React.ReactNode;      // O ícone do Lucide-React que será renderizado
  colorClass: string;         // A classe de cor do Tailwind para o ícone (Ex: "text-blue-500")
}

export function MetricCard({ title, count, icon, colorClass }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between text-zinc-400 text-xs font-medium uppercase tracking-wider">
        <span>{title}</span>
        <div className={colorClass}>
          {icon}
        </div>
      </div>
      
      {/* Conteúdo do Card: O número de destaque */}
      <div className="mt-2">
        <span className="text-3xl font-semibold tracking-tight text-zinc-100">
          {count}
        </span>
      </div>
    </div>
  );
}   