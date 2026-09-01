import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

import { authRepository } from "../repositories/auth.repository";
import { userRepository } from "@/modules/catalog/users/repositories/user.repository";

export async function getCurrentUserUseCase(): Promise<
  UserResponseDTO | null
> {
  const authUser = await authRepository.getCurrentUser();

  if (!authUser) {
    return null;
  }

  return userRepository.findById(authUser.id);
}