import { DashboardAnalyticsDto } from "@/modules/tickets/dto/DashboardAnalyticsDto";
import { BarChart3, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface AnalyticGridProps {
  data: DashboardAnalyticsDto;
}

export function AnalyticGrid({ data }: AnalyticGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total de Chamados */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase">Volume Total</p>
          <p className="text-2xl font-bold text-zinc-100 mt-1">{data.totalChamados}</p>
        </div>
        <BarChart3 className="text-zinc-500" size={22} />
      </div>

      {/* Tempo Médio */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase">Tempo Médio (TMA)</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{data.tempoMedioAtendimento}</p>
        </div>
        <Clock className="text-blue-500" size={22} />
      </div>

      {/* SLAs Estourados */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase">SLA Estourado</p>
          <p className={`text-2xl font-bold mt-1 ${data.siasEstourados > 0 ? "text-rose-500" : "text-zinc-300"}`}>
            {data.siasEstourados}
          </p>
        </div>
        <AlertTriangle className={data.siasEstourados > 0 ? "text-rose-500" : "text-zinc-500"} size={22} />
      </div>

      {/* Taxa de Satisfação */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase">Índice de Solução</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{data.taxaSatisfacao}</p>
        </div>
        <CheckCircle2 className="text-emerald-500" size={22} />
      </div>
    </div>
  );
}