import type { User } from "@/shared/domain/types/user.type";

import { hasPermission } from "@/shared/utils/has-permissions";
import { userRepository } from "../repositories/user.repository";
import { ListUsersDTO, UserResponseDTO } from "../dtos/";

export async function listUsersUseCase(
  currentUser: User,
  filters: ListUsersDTO = {}
): Promise<UserResponseDTO[]> {
  if (!hasPermission(currentUser, "user:view")) {
    throw new Error(
      "Usuário não possui permissão."
    );
  }

  /*
   * Super Admin pode consultar
   * usuários de qualquer departamento.
   */
  if (currentUser.role === "super_admin") {
    return userRepository.list(filters);
  }

  /*
   * Admin só pode consultar
   * usuários do próprio departamento.
   */
  if (currentUser.role === "admin") {
    if (!currentUser.departmentId) {
      throw new Error(
        "Admin não possui departamento."
      );
    }

    return userRepository.list({
      ...filters,
      departmentId: currentUser.departmentId,
    });
  }

  throw new Error("Acesso negado.");
}
