import type { User } from "@/shared/domain/types/user.type";
import type { UserResponseDTO } from "../dtos/user-response.dto";

import { userRepository } from "../repositories/user.repository";
import { hasPermission } from "@/shared/utils/has-permissions";

export async function activateUserUseCase(
  currentUser: User,
  userId: string
): Promise<UserResponseDTO> {
  if (!hasPermission(currentUser, "user:update")) {
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

  if (
    currentUser.role === "admin" &&
    user.departmentId !== currentUser.departmentId
  ) {
    throw new Error("Acesso negado.");
  }

  if (user.active) {
    throw new Error(
      "Usuário já está ativo."
    );
  }

  return userRepository.update(
    userId,
    {
      active: true,
    }
  );
}