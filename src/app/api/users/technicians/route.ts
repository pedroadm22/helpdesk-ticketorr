import { NextResponse } from "next/server";

import { RegisterTechnicianHandler } from "@/modules/catalog/users/handlers/register-technician.handler";
import { getCurrentUserUseCase } from "@/modules/auth/use-cases/get-current-user.usecase";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUserUseCase();

    const body = await request.json();

    const user = await RegisterTechnicianHandler(
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
            : "Erro ao criar técnico.",
      },
      { status: 403 }
    );
  }
}