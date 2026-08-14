// src/modules/auth/use-cases/get-current-user.use-case.ts
import { supabaseAuthRepository } from "../repositories/supabase-auth-repository";
import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { UserResponseDTO } from "@/modules/catalog/users/dtos";

export async function getCurrentUserUseCase(
  authRepo: IAuthRepository = supabaseAuthRepository // 🟢 Padrão definido!
): Promise<UserResponseDTO | null> {
  return await authRepo.getCurrentUser();
}