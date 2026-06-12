import { MetricCard } from "./MetricCard";
import { BarChart3, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AnalyticsData {
  totalChamados: number;
  tempoMedioAtendimento: string;
  siasEstourados: number;
  taxaSatisfacao: string;
}

interface AnalyticGridProps {
  data: AnalyticsData;
}

export function AnalyticGrid({ data }: AnalyticGridProps) {
  return (
    // Grid responsivo: 1 coluna no mobile, 2 em tablets, 4 em telas desktop
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Volume Total"
        count={data.totalChamados}
        colorClass="text-zinc-100"
        icon={<BarChart3 size={18} className="text-zinc-500" />}
      />
      <MetricCard
        title="Tempo Médio (TMA)"
        count={data.tempoMedioAtendimento}
        colorClass="text-blue-400"
        icon={<Clock size={18} className="text-blue-500" />}
      />
      <MetricCard
        title="SLA Estourado"
        count={data.siasEstourados}
        colorClass={data.siasEstourados > 0 ? "text-rose-500 font-semibold" : "text-zinc-400"}
        icon={<AlertTriangle size={18} className={data.siasEstourados > 0 ? "text-rose-500" : "text-zinc-500"} />}
      />
      <MetricCard
        title="Índice de Solução"
        count={data.taxaSatisfacao}
        colorClass="text-emerald-400"
        icon={<CheckCircle2 size={18} className="text-emerald-500" />}
      />
    </div>
  );
}