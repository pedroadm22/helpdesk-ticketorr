import { UrgentTicketItemDto } from "@/modules/tickets/dto/UrgentTicketDto";
import { AlertTriangle } from "lucide-react";

interface UrgentAlertProps {
  tickets: UrgentTicketItemDto[];
}

export function UrgentAlert({ tickets }: UrgentAlertProps) {
  if (tickets.length === 0) return null;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-400">
      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
      <div>
        <h5 className="font-semibold text-rose-300">Atenção Operacional!</h5>
        <p className="text-sm text-rose-400/90 mt-1">
          Existem {tickets.length} chamados críticos exigindo ação imediata devido ao risco ou estouro de SLA.
        </p>
      </div>
    </div>
  );
}