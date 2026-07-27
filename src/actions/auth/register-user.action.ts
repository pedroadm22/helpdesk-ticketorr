"use server";

import { createClient } from "@/infrastructure/supabase/server";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema";

export async function registerUserAction(formData: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await createClient();

  // 1. Cria a conta no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
      },
    },
  });

  if (authError || !authData.user) {
    return {
      success: false,
      error: authError?.message || "Erro ao criar conta de acesso.",
    };
  }

  try {
    // 2. Insere o registro na tabela public.users usando o mesmo ID do Auth
    await db.insert(users).values({
      id: authData.user.id,
      email: formData.email,
      name: formData.name,
      role: "CLIENT",
    });

    return {
      success: true,
      userId: authData.user.id,
    };
  } catch (dbError) {
    console.error("Erro ao inserir em public.users:", dbError);

    return {
      success: false,
      error: "Conta criada no Auth, mas falhou ao salvar o perfil no banco.",
    };
  }
}