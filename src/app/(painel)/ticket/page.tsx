import { TicketTable } from "@/components/features/tickets/ticket-table";
import { CreateTicketDialog } from "@/components/features/tickets/create-ticket-dialog";
import { listTicketsUseCase } from "@/modules/tickets/use-cases/list-tickets.use-case";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { redirect } from "next/navigation";

export default async function TicketsPage() {
  const user = await getCurrentUserUseCase();
  if (!user) redirect("/");

  const tickets = await listTicketsUseCase({
    requestedByUserId: user.id,
    requestedByUserRole: user.role,
  });

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meus Chamados</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie e acompanhe o andamento dos seus tickets de suporte.
          </p>
        </div>
        <CreateTicketDialog />
      </div>

      <TicketTable tickets={tickets} />
    </div>
  );
}