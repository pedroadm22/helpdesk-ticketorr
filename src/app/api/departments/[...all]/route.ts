import { NextResponse } from "next/server";
import { createDepartmentHandler } from "@/modules/catalog/departments/handlers/create-department.handler"

export async function GET() {
  try {
    const departments = await listDepartmentsHandler();
    return NextResponse.json(departments, { status: 200 });
  } catch (erro: any) {
    return NextResponse.json(
      { error: erro.message || "Erro ao listar departamentos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const novoDepartment = await createDepartmentHandler(body);
    return NextResponse.json(novoDepartment, { status: 201 });
  } catch (erro: any) {
    return NextResponse.json(
      { error: erro.message || "Erro ao criar departamento" },
      { status: 400 }
    );
  }
}