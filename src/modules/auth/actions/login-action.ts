// src/modules/auth/actions/login-action.ts
"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function autenticarUsuarioAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/ticket", // Para onde o usuário vai após logar com sucesso
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "E-mail ou senha inválidos.";
        default:
          return "Algo deu errado na autenticação.";
      }
    }
    throw error; // O Next.js precisa que o redirect seja lançado adiante
  }
}