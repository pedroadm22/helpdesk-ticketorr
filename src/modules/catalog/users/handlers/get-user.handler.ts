import type { User } from "@/shared/domain/types/user.type";

import { getUserUseCase } from "../use-cases/get-user.usecase";

export async function getUserHandler(
  currentUser: User,
  userId: string
) {
  return getUserUseCase(currentUser, userId);
}