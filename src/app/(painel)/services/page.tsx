import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { listServicesUseCase } from "@/modules/catalog/services/use-cases/list-services.use-case";
import { deleteServiceAction } from "@/actions/services/delete-service.action";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Plus, Wrench, Building2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ServicesPage() {
  const user = await getCurrentUserUseCase();
  
  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/ticket");

  // 1. Garante a extração segura do array de serviços independente do retorno ({ data, total } ou Array)
  const servicesResponse = await listServicesUseCase();
  const servicesList = Array.isArray(servicesResponse)
    ? servicesResponse
    : servicesResponse?.data ?? [];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Catálogo de Serviços</h1>
          <p className="text-sm text-zinc-400">Gerencie os serviços oferecidos por cada departamento.</p>
        </div>
        
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
          <Link href="/services/new" className="flex items-center gap-2">
            <Plus className="size-4" />
            Novo Serviço
          </Link>
        </Button>
      </div>

      <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/80 shadow-xl">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase text-zinc-400">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Serviço</th>
              <th className="py-3.5 px-4 font-semibold">Departamento</th>
              <th className="py-3.5 px-4 font-semibold">Descrição</th>
              <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {servicesList.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500">
                  Nenhum serviço cadastrado.
                </td>
              </tr>
            ) : (
              servicesList.map((srv) => (
                <tr key={srv.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-4 px-4 font-medium text-zinc-100">
                    <div className="flex items-center gap-2">
                      <Wrench className="size-4 text-emerald-400 shrink-0" />
                      {srv.name}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                      <Building2 className="size-3 text-zinc-400" />
                      {srv.departmentName || "Geral"}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-xs text-zinc-400 max-w-md truncate">
                    {srv.description || "—"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon-sm" variant="ghost">
                        <Link href={`/services/${srv.id}`}>
                          <Edit2 className="size-4" />
                        </Link>
                      </Button>
                      <ConfirmDeleteButton
                        title="Remover Serviço"
                        description={`Tem certeza que deseja remover o serviço "${srv.name}"?`}
                        onConfirm={async () => {
                          "use server";
                          return await deleteServiceAction(srv.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}