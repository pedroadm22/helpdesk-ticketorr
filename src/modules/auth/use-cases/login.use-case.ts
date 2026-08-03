import type { IAuthRepository } from "../repositories/auth-repository.interface";
import type { LoginDTO } from "../dtos/login.dto";
import type { AuthResponseDTO } from "../dtos/auth-response.dto";

export const loginUseCase = (authRepository: IAuthRepository) => {
  return {
    execute: async (dto: LoginDTO): Promise<AuthResponseDTO> => {
      return await authRepository.login(dto);
    },
  };
};