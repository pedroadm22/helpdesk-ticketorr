import { signOutUseCase } from "../use-cases/sign-out.usecase";

export async function signOutHandler(): Promise<void> {
  await signOutUseCase();
}