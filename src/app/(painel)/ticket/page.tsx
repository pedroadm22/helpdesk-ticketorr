// src/app/(painel)/ticket/page.tsx
import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { listTicketsUseCase } from "@/modules/tickets/use-cases/list-tickets.use-case";
import { listServicesUseCase } from "@/modules/catalog/services/use-cases/list-services.use-case";

import { CreateTicketDialog } from "@/components/features/tickets/create-ticket-dialog";
import { TicketsTable } from "@/components/features/tickets/ticket-table";
import { UserRole } from "@/shared/types/domain/zod.types";

export default async function TicketsPage() {
  const user = await getCurrentUserUseCase();

  // 1. Redireciona com segurança caso o usuário não esteja logado
  if (!user) {
    redirect("/login");
  }

  const servicesResponse = await listServicesUseCase({ isActive: true });

  const rawServices = Array.isArray(servicesResponse)
    ? servicesResponse
    : (servicesResponse?.data ?? []);

  // 2. Agora o .map funciona perfeitamente porque 'rawServices' é garantidamente um Array!
  const servicesList = rawServices.map((srv) => ({
    id: srv.id,
    name: srv.name,
    departmentId: srv.departmentId,
    departmentName: srv.departmentName ?? "Geral",
  }));

  // 3. Busca os tickets aplicando os filtros com base na Role
  const { tickets } = await listTicketsUseCase({
    scope: {
      userId: user.id,
      role: user.role,
    },
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Cabeçalho dinâmico */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            {user.role === "ADMIN" && "Painel de Distribuição de Chamados"}
            {user.role === "TECHNICIAN" && "Meus Atendimentos"}
            {user.role === "CLIENT" && "Meus Chamados"}
          </h1>
          <p className="text-sm text-zinc-400">
            {user.role === "ADMIN" &&
              "Acompanhe e atribua os chamados pendentes para os técnicos."}
            {user.role === "TECHNICIAN" &&
              "Gerencie as solicitações atribuídas à sua fila."}
            {user.role === "CLIENT" &&
              "Acompanhe o andamento das suas solicitações."}
          </p>
        </div>

        {/* Botão de abrir chamado */}
        <CreateTicketDialog servicesList={servicesList} />
      </div>

      {/* Lista / Tabela de Tickets */}
      <TicketsTable tickets={tickets} userRole={user.role} />
    </div>
  );
}
