"use client";

import { useSlaCalculator } from "@/hooks/useSlaCalculator";

interface SlaProgressBarProps {
  dataCriacao: Date;
  tempoLimiteHoras: number;
}

export function SlaProgressBar({ dataCriacao, tempoLimiteHoras }: SlaProgressBarProps) {
  // Consome a lógica isolada do hook
  const { porcentagem, barColorClass, textColorClass, textoSla } = useSlaCalculator({
    dataCriacao,
    tempoLimiteHoras,
  });

  return (
    <div className="w-full space-y-1.5">
      {/* Textos de apoio superiores */}
      <div className="flex items-center justify-between text-xs font-medium">
        <span className="text-zinc-400">Progresso do SLA</span>
        <span className={textColorClass}>{textoSla}</span>
      </div>

      {/* A Casca da Barra (Track) */}
      <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
        {/* O preenchimento dinâmico (Fill) */}
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColorClass}`}
          style={{ width: `${porcentagem}%` }}
        />
      </div>
    </div>
  );
}