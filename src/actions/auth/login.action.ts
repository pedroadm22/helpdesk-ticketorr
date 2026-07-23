"use server";

import { auth } from "@/infrastructure/auth";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto";
import { headers } from "next/headers";

interface LoginState {
  success: boolean;
  error?: string;
}

export async function loginAction(data: LoginInputDto): Promise<LoginState> {
  try {
    await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
      headers: await headers(),
    });

    // Retorna sucesso para o cliente orquestrar a navegação
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "E-mail ou senha incorretos.",
    };
  }
}