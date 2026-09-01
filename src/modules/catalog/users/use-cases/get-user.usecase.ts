import type { User } from "@/shared/domain/types/user.type";

import { hasPermission } from "@/shared/utils/has-permissions";
import { userRepository } from "../repositories/user.repository";
import { ListUsersDTO, UserResponseDTO } from "../dtos";

export async function getUserUseCase(
  currentUser: User,
  userId: string
): Promise<UserResponseDTO> {
  if (!hasPermission(currentUser, "user:view")) {
    throw new Error(
      "Usuário não possui permissão."
    );
  }

  const user =
    await userRepository.findById(userId);

  if (!user) {
    throw new Error(
      "Usuário não encontrado."
    );
  }

  // Admin só pode visualizar usuários
  // do próprio departamento.
  if (
    currentUser.role === "admin" &&
    user.departmentId !== currentUser.departmentId
  ) {
    throw new Error("Acesso negado.");
  }

  return user;
}