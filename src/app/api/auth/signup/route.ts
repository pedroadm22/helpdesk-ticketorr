import { NextResponse } from "next/server";

import { signUpHandler } from "@/modules/auth/handlers/sign-up.handler";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await signUpHandler(body);

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
            : "Erro ao realizar cadastro.",
      },
      { status: 400 }
    );
  }
}