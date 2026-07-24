"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionResult = {
  success: boolean;
  message?: string;
};

export async function signOutAction(): Promise<AuthActionResult> {
  try {
    const supabase = await createClient();
    
    // Encerra a sessão no Supabase e limpa os cookies de autenticação
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, message: error.message || "Erro ao encerrar a sessão." };
    }

    // Limpa o cache das rotas
    revalidatePath("/", "layout");
  } catch {
    return { success: false, message: "Erro ao conectar com o servidor." };
  }

  // Redireciona o usuário para a tela inicial / login
  redirect("/");
}

export async function getCurrentUser() {
  const supabase = await createClient();

  // Obtém o usuário atual validando o token JWT do cookie de forma segura
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}