import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.usecase";
import { createAdminHandler } from "@/modules/catalog/users/handlers/register-admin.handler";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUserUseCase();

    const body = await request.json();

    const user = await createAdminHandler(
      currentUser,
      body
    );

    return NextResponse.json(
      user,
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erro ao criar administrador.",
      },
      { status: 403 }
    );
  }
}