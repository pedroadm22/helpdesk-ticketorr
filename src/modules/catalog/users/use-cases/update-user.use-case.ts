import type { IUserRepository } from "../repositories/user-repository.interface";
import type { UpdateUserDTO } from "../dtos/update-user.dto";
import type { UserResponseDTO } from "../dtos/user-response.dto";

export const updateUserUseCase = (userRepository: IUserRepository) => {
  return {
    execute: async (dto: UpdateUserDTO): Promise<UserResponseDTO> => {
      const user = await userRepository.findById(dto.id);

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      if (dto.email && dto.email !== user.email) {
        const emailExists = await userRepository.findByEmail(dto.email);

        if (emailExists) {
          throw new Error("Este e-mail já está em uso por outro usuário.");
        }
      }

      const updatedUser = await userRepository.update(dto);

      if (!updatedUser) {
        throw new Error("Falha ao atualizar o usuário.");
      }

      return updatedUser;
    },
  };
};