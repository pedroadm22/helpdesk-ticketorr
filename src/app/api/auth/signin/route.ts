import { NextResponse } from "next/server";

import { signInHandler } from "@/modules/auth/handlers/sign-in.handler";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await signInHandler(body);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Erro ao realizar login.",
      },
      { status: 401 }
    );
  }
}