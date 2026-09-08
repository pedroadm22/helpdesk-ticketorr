import type { SignUpDTO } from "../dtos/sign-up.dto";
import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

import { authRepository } from "../repositories/auth.repository";
import { userRepository } from "@/modules/catalog/users/repositories/user.repository";

export async function signUpUseCase(
  data: SignUpDTO
): Promise<UserResponseDTO> {

  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  if (!name) {
    throw new Error("Nome é obrigatório.");
  }

  if (!email) {
    throw new Error("Email é obrigatório.");
  }

  if (!data.password) {
    throw new Error("Senha é obrigatória.");
  }

  if (data.password.length < 6) {
    throw new Error(
      "A senha deve ter pelo menos 6 caracteres."
    );
  }

  const existingUser =
    await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error(
      "Já existe um usuário cadastrado com esse email."
    );
  }

  const authData = await authRepository.signUp(
    email,
    data.password
  );

  if (!authData.user) {
    throw new Error(
      "Não foi possível criar a conta."
    );
  }

  return userRepository.create({
    id: authData.user.id,
    name,
    email,
    role: "client",
    departmentId: null,
    teamId: null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
