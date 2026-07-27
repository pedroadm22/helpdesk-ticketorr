import { loginSchema, LoginInputDto } from "@/modules/auth/dto/login-submit.dto";
import { createClient } from "@/infrastructure/supabase/client";

export type LoginResult = 
  | { success: true }
  | { success: false; error: string };

export async function loginAction(data: LoginInputDto): Promise<LoginResult> {
  // 1. Validação do DTO antes de enviar
  const parseResult = loginSchema.safeParse(data);
  if (!parseResult.success) {
    return {
      success: false,
      error: "Dados de entrada inválidos.",
    };
  }

  // 2. Chamada de Infraestrutura
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parseResult.data.email,
    password: parseResult.data.password,
  });

  if (error) {
    return {
      success: false,
      error: error.message || "E-mail ou senha incorretos.",
    };
  }

  return { success: true };
}