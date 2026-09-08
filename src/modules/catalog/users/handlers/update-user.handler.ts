import type { User } from "@/shared/domain/types/user.type";
import type { UpdateUserDTO } from "../dtos/update-user.dto";

import { UpdateUserUseCase } from "../use-cases/update-user.usecase";

export async function updateUserHandler(
  currentUser: User,
  userId: string,
  data: UpdateUserDTO
) {
  return UpdateUserUseCase(
    currentUser,
    userId,
    data
  );
}