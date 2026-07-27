import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.use-case";
import { dashboardRepository } from "@/modules/dashboard/repositories/dashboard.repository";
import { Ticket, Clock, Building2, Wrench, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await getCurrentUserUseCase();
  if (user?.role !== "ADMIN" && user?.role !== "TECHNICIAN") redirect("/ticket");

  const metrics = await dashboardRepository.getMetrics();

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">

      {/* Cards Principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Chamados Abertos</span>
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400">
              <Clock className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-zinc-100">{metrics.openTickets}</div>
        </div>

        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Total de Chamados</span>
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
              <Ticket className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-zinc-100">{metrics.totalTickets}</div>
        </div>

        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Departamentos</span>
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400">
              <Building2 className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-zinc-100">{metrics.totalDepartments}</div>
        </div>

        <div className="p-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl space-y-3">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Serviços No Catálogo</span>
            <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400">
              <Wrench className="size-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-zinc-100">{metrics.totalServices}</div>
        </div>
      </div>

      {/* Atalhos Rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/departments"
          className="group p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h2 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Gerenciar Departamentos
            </h2>
            <p className="text-xs text-zinc-400">Visualize e cadastre os setores da organização.</p>
          </div>
          <ArrowUpRight className="size-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
        </Link>

        <Link
          href="/services"
          className="group p-6 bg-zinc-950/80 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-all flex items-center justify-between"
        >
          <div className="space-y-1">
            <h2 className="font-semibold text-zinc-100 group-hover:text-emerald-400 transition-colors">
              Gerenciar Catálogo de Serviços
            </h2>
            <p className="text-xs text-zinc-400">Edite ou adicione novos tipos de atendimento.</p>
          </div>
          <ArrowUpRight className="size-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
        </Link>
      </div>
    </div>
  );
}