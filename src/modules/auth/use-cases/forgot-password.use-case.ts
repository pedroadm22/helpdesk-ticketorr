import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { ForgotPasswordDTO } from "../dtos/forgot-password.dto";

export const forgotPasswordUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (dto: ForgotPasswordDTO): Promise<void> => {
      await authRepository.forgotPassword(dto);
    },
  };
};