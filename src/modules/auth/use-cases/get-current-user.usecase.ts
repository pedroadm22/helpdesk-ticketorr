import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

import { authRepository } from "../repositories/auth.repository";
import { userRepository } from "@/modules/catalog/users/repositories/user.repository";

export async function getCurrentUserUseCase(): Promise<UserResponseDTO> {
  const authUser = await authRepository.getCurrentUser();
  if (!authUser) {
    throw new Error("Usuário não autenticado.");
  }
  const user = await userRepository.findById(authUser.id);
  if (!user) {
    throw new Error("Usuário da aplicação não encontrado.");
  }
  if (!user.active) {
    throw new Error("Usuário está desativado.");
  }
  return user;
}
