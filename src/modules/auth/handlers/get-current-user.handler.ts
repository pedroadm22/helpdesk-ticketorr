import { getCurrentUserUseCase } from "../use-cases/get-current-user.usecase";

export async function getCurrentUserHandler() {
  return getCurrentUserUseCase();
}