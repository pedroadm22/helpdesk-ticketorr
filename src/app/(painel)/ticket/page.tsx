// src/app/(painel)/ticket/page.tsx

import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { listTicketsUseCase } from "@/modules/tickets/use-cases/list-tickets.use-case";
import { listServicesUseCase } from "@/modules/services/use-cases/list-services.use-case";

import { CreateTicketDialog } from "@/components/features/tickets/create-ticket-dialog";
// Importe seus componentes de tabela/cards aqui

export default async function TicketsPage() {
  const user = await getCurrentUserUseCase();

  if (!user) {
    // Redirecionamento ou retorno de não autorizado
    return null;
  }

  // 1. Busca os serviços disponíveis para o modal de criar chamado
  const rawServices = (await listServicesUseCase()) || [];
  const servicesList = rawServices.map((srv) => ({
    id: srv.id,
    name: srv.name,
    departmentId: srv.departmentId,
    departmentName: srv.departmentName ?? "Geral",
  }));

  // 2. Busca os tickets aplicando os filtros com base no Papel (Role)
  const tickets = await listTicketsUseCase({
    requestedByUserId: user.id,
    requestedByUserRole: user.role, // 'CLIENT' | 'TECHNICIAN' | 'ADMIN'
  });

  return (
    <div className="p-8 space-y-6">
      {/* Cabeçalho dinâmico */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">
            {user.role === "ADMIN" && "Painel de Distribuição de Chamados"}
            {user.role === "TECHNICIAN" && "Meus Atendimentos"}
            {user.role === "CLIENT" && "Meus Chamados"}
          </h1>
          <p className="text-sm text-zinc-400">
            {user.role === "ADMIN" && "Acompanhe e atribua os chamados pendentes para os técnicos."}
            {user.role === "TECHNICIAN" && "Gerencie as solicitações atribuídas à sua fila."}
            {user.role === "CLIENT" && "Acompanhe o andamento das suas solicitações."}
          </p>
        </div>

        {/* Botão de abrir chamado (Apenas Clientes ou todos, dependendo da regra de negócio) */}
        <CreateTicketDialog servicesList={servicesList} />
      </div>

      {/* Lista / Tabela de Tickets */}
      {/* Aqui você renderiza a lista passando o array de `tickets` obtidos */}
    </div>
  );
}