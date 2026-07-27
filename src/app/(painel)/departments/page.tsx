import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { listDepartmentsUseCase } from "@/modules/departments/use-cases/list-departments.use-case";
import { deleteDepartmentAction } from "@/actions/departments/delete-department.action";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Plus, Building2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DepartmentsPage() {
  const user = await getCurrentUserUseCase();
  if (user?.role !== "ADMIN") redirect("/ticket");

  const departmentsList = await listDepartmentsUseCase();

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Gestão de Departamentos</h1>
          <p className="text-sm text-zinc-400">Gerencie os setores organizacionais da instituição.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
          <Link href="/departments/new">
            <Plus />
            Novo Departamento
          </Link>
        </Button>
      </div>

      <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-zinc-950/80 shadow-xl">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-900/80 border-b border-zinc-800 text-xs uppercase text-zinc-400">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Departamento</th>
              <th className="py-3.5 px-4 font-semibold">Descrição</th>
              <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60">
            {departmentsList.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-zinc-500">
                  Nenhum departamento cadastrado.
                </td>
              </tr>
            ) : (
              departmentsList.map((dep) => (
                <tr key={dep.id} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="py-4 px-4 font-medium text-zinc-100">
                    <div className="flex items-center gap-2">
                      <Building2 className="size-4 text-emerald-400 shrink-0" />
                      {dep.name}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-xs text-zinc-400 max-w-md truncate">
                    {dep.description || "—"}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon-sm" variant="ghost">
                        <Link href={`/departments/${dep.id}`}>
                          <Edit2 />
                        </Link>
                      </Button>
                      <ConfirmDeleteButton
                        title="Remover Departamento"
                        description={`Tem certeza que deseja remover o departamento "${dep.name}"?`}
                        onConfirm={async () => {
                          "use server";
                          return await deleteDepartmentAction(dep.id);
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