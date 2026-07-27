// src/app/(painel)/departments/[id]/page.tsx
import { notFound } from "next/navigation";
import { departmentRepository } from "@/modules/departments/repositories/department.repository";
import { DepartmentForm } from "@/components/features/departments/department-form";

interface EditDepartmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditDepartmentPage({ params }: EditDepartmentPageProps) {
  const { id } = await params;

  // Busca o departamento direto via repositório
  const department = await departmentRepository.findById(id);

  if (!department) {
    notFound();
  }

  return <DepartmentForm department={department} />;
}