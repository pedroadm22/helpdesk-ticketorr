import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { ResetPasswordDTO } from "../dtos/reset-password.dto";

export const resetPasswordUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (dto: ResetPasswordDTO): Promise<void> => {
      await authRepository.resetPassword(dto);
    },
  };
};