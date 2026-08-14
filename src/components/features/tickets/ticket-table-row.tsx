import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// 1. Inclua 'RESOLVED' e 'VIEWED' na união de tipos
export interface TicketDTO {
  id: string;
  title: string;
  status:
    | "WAITING_SUPPORT"
    | "WAITING_AGENT"
    | "WAITING_CLIENT"
    | "VIEWED"
    | "RESOLVED"
    | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  clientName?: string;
  clientEmail?: string;
  updatedAt?: Date | string;
}

// 2. Mapeie as opções visuais para esses dois novos status
const STATUS_CONFIG: Record<
  TicketDTO["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  WAITING_SUPPORT: { label: "Pending Support", variant: "destructive" },
  WAITING_AGENT: { label: "In Progress", variant: "default" },
  WAITING_CLIENT: { label: "Pending Client", variant: "secondary" },
  VIEWED: { label: "Viewed", variant: "secondary" },
  RESOLVED: { label: "Resolved", variant: "outline" },
  CLOSED: { label: "Closed", variant: "outline" },
};

const PRIORITY_STYLES = {
  LOW: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
  MEDIUM: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  HIGH: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  URGENT: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 font-bold",
};

export function TicketTableRow({ ticket }: { ticket: TicketDTO }) {
  const status = STATUS_CONFIG[ticket.status] || {
    label: ticket.status,
    variant: "outline" as const,
  };

  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      {/* Protocol ID */}
      <TableCell className="w-32 font-mono text-xs font-bold text-primary">
        #{ticket.id.slice(0, 8).toUpperCase()}
      </TableCell>

      {/* Customer */}
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
            <User className="h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <span className="max-w-40 truncate text-sm font-medium">
            {ticket.clientName || ticket.clientEmail || "N/A"}
          </span>
        </div>
      </TableCell>

      {/* Subject */}
      <TableCell className="min-w-52 font-medium">
        <span className="line-clamp-1">{ticket.title}</span>
      </TableCell>

      {/* Status */}
      <TableCell>
        <Badge variant={status.variant}>{status.label}</Badge>
      </TableCell>

      {/* Priority */}
      <TableCell>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[ticket.priority]}`}
        >
          {ticket.priority}
        </span>
      </TableCell>

      {/* Last Updated */}
      <TableCell className="text-right text-xs text-muted-foreground">
        {ticket.updatedAt
          ? formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })
          : "N/A"}
      </TableCell>

      {/* Action */}
      <TableCell className="w-16 text-right">
        <Link
          href={`/dashboard/tickets/${ticket.id}`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-foreground" />
        </Link>
      </TableCell>
    </TableRow>
  );
}