import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { UserResponseDTO } from "@/modules/catalog/users/dtos/user-response.dto";

export const getCurrentUserUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (): Promise<UserResponseDTO | null> => {
      return await authRepository.getCurrentUser();
    },
  };
};