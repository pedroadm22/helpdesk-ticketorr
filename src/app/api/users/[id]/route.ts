import { NextResponse } from "next/server";

import { updateUserHandler } from "@/modules/catalog/users/handlers/update-user.handler";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.usecase";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const currentUser =
      await getCurrentUserUseCase();

    const body = await request.json();

    const user = await updateUserHandler(
      currentUser,
      id,
      body
    );

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erro ao atualizar usuário.",
      },
      { status: 403 }
    );
  }
}