import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { RegisterDTO } from "../dtos/register.dto";
import type { AuthResponseDTO } from "../dtos/auth-response.dto";

export const registerUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (dto: RegisterDTO): Promise<AuthResponseDTO> => {
      return await authRepository.register(dto);
    },
  };
};