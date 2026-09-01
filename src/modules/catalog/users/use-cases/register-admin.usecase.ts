import type { User } from "@/shared/domain/types/user.type";

import type { RegisterAdminDTO } from "../dtos/register-admin.dto";
import type { UserResponseDTO } from "../dtos/user-response.dto";

import { authRepository } from "@/modules/auth/repositories/auth.repository";
import { userRepository } from "../repositories/user.repository";

export async function RegisterAdminUseCase(
  currentUser: User,
  data: RegisterAdminDTO
): Promise<UserResponseDTO> {

  // 1. Apenas o Super Admin pode criar um Admin
  if (currentUser.role !== "super_admin") {
    throw new Error(
      "Apenas o Super Admin pode criar um Admin."
    );
  }

  // 2. Valida dados obrigatórios
  if (!data.name.trim()) {
    throw new Error("Nome é obrigatório.");
  }

  if (!data.email.trim()) {
    throw new Error("Email é obrigatório.");
  }

  if (!data.password) {
    throw new Error("Senha é obrigatória.");
  }

  if (!data.departmentId) {
    throw new Error("Departamento é obrigatório.");
  }

  // 3. Valida tamanho mínimo da senha
  if (data.password.length < 6) {
    throw new Error(
      "A senha deve ter pelo menos 6 caracteres."
    );
  }

  // 4. Verifica se já existe um usuário com esse email
  const existingUser =
    await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error(
      "Já existe um usuário cadastrado com esse email."
    );
  }

  // 5. Cria a conta no Supabase Auth
  const authData = await authRepository.signUp(
    data.email,
    data.password
  );

  if (!authData.user) {
    throw new Error(
      "Não foi possível criar a conta de autenticação."
    );
  }

  // 6. Cria o usuário da aplicação
  return userRepository.create({
    id: authData.user.id,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),

    role: "admin",

    departmentId: data.departmentId,
    teamId: null,

    active: true,

    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
