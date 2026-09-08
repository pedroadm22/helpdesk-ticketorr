import { NextResponse } from "next/server";

import { getCurrentUserHandler } from "@/modules/auth/handlers/get-current-user.handler";

export async function GET() {
  try {
    const user = await getCurrentUserHandler();

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Usuário não autenticado.",
      },
      { status: 401 }
    );
  }
}