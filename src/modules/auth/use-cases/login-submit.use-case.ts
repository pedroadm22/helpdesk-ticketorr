import { LoginInputDto, loginSchema } from "@/modules/auth/dto/login-submit.dto";
import { authRepository, AuthResponse } from "../repositories/auth.repository";

export async function loginSubmitUseCase(
  input: LoginInputDto
): Promise<AuthResponse> {
  // 1. Valida a entrada de email/senha com o Zod
  const validatedData = loginSchema.parse(input);

  // 2. Executa a autenticação via Supabase Auth no repositório funcional
  const result = await authRepository.signInWithEmail(validatedData);

  if (!result.success) {
    throw new Error(result.message || "Falha na autenticação.");
  }

  return result;
}