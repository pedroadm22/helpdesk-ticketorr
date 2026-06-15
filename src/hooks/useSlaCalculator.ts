import { useMemo } from "react";

interface UseSlaCalculatorProps {
  dataCriacao: Date;
  tempoLimiteHoras: number;
}

export function useSlaCalculator({ dataCriacao, tempoLimiteHoras }: UseSlaCalculatorProps) {
  return useMemo(() => {
    const agora = new Date().getTime();
    const inicio = new Date(dataCriacao).getTime();
    const limiteEmMilissegundos = tempoLimiteHoras * 60 * 60 * 1000;
    const fim = inicio + limiteEmMilissegundos;

    const tempoDecorrido = agora - inicio;
    
    // Calcula a porcentagem do SLA consumido (limitado entre 0% e 100%)
    const porcentagemRaw = (tempoDecorrido / limiteEmMilissegundos) * 100;
    const porcentagem = Math.min(Math.max(porcentagemRaw, 0), 100);

    // Descobre quanto tempo resta ou passou em horas/minutos
    const tempoRestante = fim - agora;
    const horas = Math.floor(Math.abs(tempoRestante) / (1000 * 60 * 60));
    const minutos = Math.floor((Math.abs(tempoRestante) % (1000 * 60 * 60)) / (1000 * 60));

    const isEstourado = tempoRestante < 0;

    // Definição das classes visuais com base nas regras de negócio
    let barColorClass = "bg-emerald-500";
    let textColorClass = "text-zinc-400";

    if (isEstourado) {
      barColorClass = "bg-rose-600 animate-pulse";
      textColorClass = "text-rose-400 font-semibold";
    } else if (porcentagem >= 85) {
      barColorClass = "bg-rose-500 animate-pulse";
      textColorClass = "text-rose-400 font-medium";
    } else if (porcentagem >= 50) {
      barColorClass = "bg-amber-500";
      textColorClass = "text-amber-400";
    }

    // Texto de apoio já formatado
    const textoSla = isEstourado
      ? `Estourado há ${horas}h ${minutos}m`
      : `${horas}h ${minutos}m restantes`;

    return {
      porcentagem,
      barColorClass,
      textColorClass,
      textoSla,
    };
  }, [dataCriacao, tempoLimiteHoras]); // Recalcula apenas se o ticket ou a prioridade mudarem
}