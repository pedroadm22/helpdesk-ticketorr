import type { IUserRepository } from "../repositories/user-repository.interface";
import type { UserResponseDTO } from "../dtos/user-response.dto";

export const getUserByIdUseCase = (userRepository: IUserRepository) => {
  return {
    execute: async (id: string): Promise<UserResponseDTO> => {
      const user = await userRepository.findById(id);

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      return user;
    },
  };
};