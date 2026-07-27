import { RegisterInput, registerSchema } from "../dto/register-user.dto";
import { createClient } from "@/infrastructure/supabase/server";
import { authRepository } from "../repositories/auth.repository";

export interface RegisterUserOutput {
  userId: string;
  email: string;
}

export async function registerUserUseCase(
  input: RegisterInput
): Promise<RegisterUserOutput> {
  // 1. Validação de formato dos dados com Zod
  const validatedData = registerSchema.parse(input);

  const supabase = await createClient();

  // 2. Cadastro no Supabase Auth (auth.users)
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
    options: {
      data: { name: validatedData.name },
    },
  });

  if (authError || !authData.user) {
    throw new Error(authError?.message || "Erro ao realizar o cadastro.");
  }

  const userId = authData.user.id;

  // 3. Criação do perfil do usuário na tabela pública via repositório
  await authRepository.createUserProfile({
    id: userId,
    email: validatedData.email,
    name: validatedData.name,
    role: "CLIENT",
  });

  return {
    userId,
    email: validatedData.email,
  };
}