// src/modules/auth/use-cases/login.use-case.ts
import { supabaseAuthRepository } from "../repositories/supabase-auth-repository";
import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { LoginDTO, AuthResponseDTO } from "../dtos";

export async function loginUseCase(
  dto: LoginDTO,
  authRepo: IAuthRepository = supabaseAuthRepository // 🟢 Padrão definido!
): Promise<AuthResponseDTO> {
  return await authRepo.login(dto);
}