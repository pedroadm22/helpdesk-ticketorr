import type { User } from "@/shared/domain/types/user.type";
import type { UserResponseDTO } from "../dtos/user-response.dto";

import { userRepository } from "../repositories/user.repository";
import { hasPermission } from "@/shared/utils/has-permissions";
import { UpdateUserDTO } from "../dtos";

export async function UpdateUserUseCase(
  currentUser: User,
  userId: string,
  data: UpdateUserDTO
): Promise<UserResponseDTO> {

  if (!hasPermission(currentUser, "user:update")) {
    throw new Error("Usuário não possui permissão.");
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  // Admin só pode alterar usuários
  // do próprio departamento.
  if (
    currentUser.role === "admin" &&
    user.departmentId !== currentUser.departmentId
  ) {
    throw new Error("Acesso negado.");
  }

  // Admin não pode promover alguém
  // para Admin ou Super Admin.
  if (
    currentUser.role === "admin" &&
    (data.role === "admin" ||
     data.role === "super_admin")
  ) {
    throw new Error(
      "Admin não pode atribuir essa role."
    );
  }

  // Somente Super Admin pode atribuir
  // a role Super Admin.
  if (
    data.role === "super_admin" &&
    currentUser.role !== "super_admin"
  ) {
    throw new Error(
      "Apenas o Super Admin pode atribuir essa role."
    );
  }

  return userRepository.update(userId, data);
}