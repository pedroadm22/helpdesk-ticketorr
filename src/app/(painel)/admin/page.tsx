// src/app/(dashboard)/dashboard/admin/page.tsx
import { Building2, Wrench } from "lucide-react";
import { listDepartmentsUseCase } from "@/modules/departments/use-cases/list-departments.use-case";
import { listServicesUseCase } from "@/modules/services/use-cases/list-services.use-case";

import { AdminFeatureCard } from "@/components/ui/admin-features-card";
import { CreateDepartmentDialog } from "@/components/features/catalog/create-department-dialog";
import { CreateServiceDialog } from "@/components/features/catalog/create-service-dialog";

export default async function AdminDashboardPage() {
  const departments = await listDepartmentsUseCase();
  const services = await listServicesUseCase();

  const departmentsListForSelect = departments.map((dept) => ({
    id: dept.id,
    name: dept.name,
    description: dept.description,
  }));

  // Mapeia Departamentos para o Card Genérico
  const formattedDepartments = departments.map((dept) => ({
    id: dept.id,
    title: dept.name,
    subtitle: `${dept.servicesCount} serviço(s)`,
  }));

  // Mapeia Serviços para o Card Genérico
  const formattedServices = services.map((srv) => ({
    id: srv.id,
    title: srv.name,
    subtitle: srv.departmentName,
  }));

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Painel de Administração
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os módulos, parâmetros e configurações globais do sistema.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Departamentos */}
        <AdminFeatureCard
          title="Departamentos"
          description="Setores responsáveis pelo atendimento"
          icon={<Building2 className="h-5 w-5 text-primary" />} // 👈 Passando como elemento JSX
          count={departments.length}
          recentItems={formattedDepartments}
          emptyMessage="Nenhum departamento cadastrado."
          actionButton={<CreateDepartmentDialog />}
        />

        {/* Card 2: Serviços */}
        <AdminFeatureCard
          title="Serviços"
          description="Catálogo de tipos de solicitação"
          icon={<Wrench className="h-5 w-5 text-primary" />} // 👈 Passando como elemento JSX
          count={services.length}
          recentItems={formattedServices}
          emptyMessage="Nenhum serviço cadastrado."
          actionButton={
            <CreateServiceDialog departmentsList={departmentsListForSelect} />
          }
        />
      </div>
    </div>
  );
}
