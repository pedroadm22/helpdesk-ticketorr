import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/features/services/service-form";
import { getServiceByIdUseCase } from "@/modules/services/use-cases/get-service-by-id.use-case";
import { listDepartmentsUseCase } from "@/modules/departments/use-cases/list-departments.use-case";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { id } = await params;

  // Busca o serviço e a lista de departamentos simultaneamente para performance
  const [service, departmentsList] = await Promise.all([
  getServiceByIdUseCase(id),
  listDepartmentsUseCase(),
]);

  // Se o serviço não existir no banco, redireciona para a página 404 do Next.js
  if (!service) {
    notFound();
  }

  return (
    <ServiceForm
      service={service}
      departmentsList={departmentsList}
    />
  );
}