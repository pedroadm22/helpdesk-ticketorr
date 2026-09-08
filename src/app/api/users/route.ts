import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.usecase";
import { listUsersHandler } from "@/modules/catalog/users/handlers/list-users.handler";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUserUseCase();

    const { searchParams } = new URL(request.url);

    const filters = {
      role: searchParams.get("role") ?? undefined,
      departmentId:
        searchParams.get("departmentId") ?? undefined,
      teamId:
        searchParams.get("teamId") ?? undefined,
    };

    const users = await listUsersHandler(
      currentUser,
      filters
    );

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erro ao listar usuários.",
      },
      { status: 403 }
    );
  }
}