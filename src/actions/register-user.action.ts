//register action

"use server";

import { createClient } from "@/infrastructure/supabase/server";
import { registerSchema, RegisterInput } from "@/modules/auth/dto/register-user.dto";

export type RegisterResult = 
  | { success: true }
  | { success: false; error: string };

export async function registerAction(data: RegisterInput): Promise<RegisterResult> {
  // 1. Validação do DTO antes de enviar
  const parseResult = registerSchema.safeParse(data);
  if (!parseResult.success) {
    return {
      success: false,
      error: "Dados de entrada inválidos.",
    };
  }

  // 2. Instancia o cliente do Supabase no lado do servidor
  const supabase = await createClient();

  // 3. Cadastra o novo usuário
  const { data: authData, error } = await supabase.auth.signUp({
    email: parseResult.data.email,
    password: parseResult.data.password,
    options: {
      // Opcional: Se você tiver metadados adicionais (como nome do usuário)
      data: {
        name: parseResult.data.name ?? "",
      },
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message ?? "Erro ao realizar o cadastro.",
    };
  }

  // Se o Supabase estiver configurado para exigir confirmação de e-mail,
  // o usuário é criado mas a sessão só estará ativa após a confirmação.
  return { success: true };
}