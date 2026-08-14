import type { IAuthRepository } from "../repositories/auth-repository.interface";

export const logoutUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (): Promise<void> => {
      await authRepository.logout();
    },
  };
};