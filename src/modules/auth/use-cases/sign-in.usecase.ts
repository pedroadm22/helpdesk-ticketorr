import type { SignInDTO } from "../dtos/sign-in.dto";

import { authRepository } from "../repositories/auth.repository";

export async function signInUseCase(
  dados: SignInDTO
) {
  if (!dados.email || !dados.password) {
    throw new Error("Email e senha são obrigatórios.");
  }

  return authRepository.signIn(
    dados.email,
    dados.password
  );
}