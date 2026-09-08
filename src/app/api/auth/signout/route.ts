import { NextResponse } from "next/server";

import { signOutHandler } from "@/modules/auth/handlers/sign-out";

export async function POST() {
  try {
    await signOutHandler();

    return NextResponse.json({
      message: "Logout realizado com sucesso.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Não foi possível realizar o logout.",
      },
      {
        status: 500,
      }
    );
  }
}