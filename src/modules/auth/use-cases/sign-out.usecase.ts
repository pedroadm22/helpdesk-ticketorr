import { authRepository } from "../repositories/auth.repository";

export async function signOutUseCase(): Promise<void> {
  await authRepository.signOut();
}