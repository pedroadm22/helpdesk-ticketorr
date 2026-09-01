import { authRepository } from "@/modules/auth/repositories/auth.repository";
import type { RegisterClientDTO } from "../dtos/register-client.dto";
import type { UserResponseDTO } from "../dtos/user-response.dto";

import { userRepository } from "../repositories/user.repository";

export async function registerClientUseCase(
  data: RegisterClientDTO
): Promise<UserResponseDTO> {

  // 1. valida dados

  // 2. verifica email
  const existingUser =
    await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("Email já cadastrado.");
  }

  // 3. cria conta no Supabase Auth
  const authData = await authRepository.signUp(
    data.email,
    data.password
  );

  if (!authData.user) {
    throw new Error(
      "Não foi possível criar a conta."
    );
  }

  // 4. cria usuário da aplicação
  return userRepository.create({
    id: authData.user.id,
    name: data.name,
    email: data.email,
    role: "client",
    departmentId: null,
    teamId: null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}