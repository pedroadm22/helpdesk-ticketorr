import { userRepository } from "@/modules/catalog/users/repositories/user.repository";
import type { SignInDTO } from "../dtos/sign-in.dto";

import { authRepository } from "../repositories/auth.repository";
import { AuthResponseDTO } from "../dtos";

export async function signInUseCase(data: SignInDTO): Promise<AuthResponseDTO> {
  const email = data.email.trim().toLowerCase();
  if (!email) {
    throw new Error("Email é obrigatório.");
  }
  if (!data.password) {
    throw new Error("Senha é obrigatória.");
  }
  const authData = await authRepository.signIn(email, data.password);
  if (!authData.user || !authData.session) {
    throw new Error("Não foi possível realizar o login.");
  }
  const user = await userRepository.findById(authData.user.id);
  if (!user) {
    throw new Error("Usuário da aplicação não encontrado.");
  }
  if (!user.active) {
    await authRepository.signOut();
    throw new Error("Usuário está desativado.");
  }
  return {
    user,
    session: authData.session,
  };
}
