import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TicketTableRow, TicketDTO } from "./ticket-table-row";

export function TicketTable({ tickets }: { tickets: TicketDTO[] }) {
  if (!tickets.length) {
    return (
      <div className="flex h-32 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        No support tickets found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow>
            <TableHead className="w-30">Protocol ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="min-w-50">Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
            <TableHead className="w-15"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tickets.map((ticket) => (
            <TicketTableRow key={ticket.id} ticket={ticket} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}