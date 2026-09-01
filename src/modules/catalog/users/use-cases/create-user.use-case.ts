import type { IUserRepository } from "../repositories/user-repository";
import type { CreateUserDTO } from "../dtos/create-admin.type";
import type { UserResponseDTO } from "../dtos/user-response.dto";

export const createUserUseCase = (userRepository: IUserRepository) => {
  return {
    execute: async (dto: CreateUserDTO): Promise<UserResponseDTO> => {
      const existingUser = await userRepository.findByEmail(dto.email);

      if (existingUser) {
        throw new Error("Já existe um usuário cadastrado com este e-mail.");
      }

      return await userRepository.create(dto);
    },
  };
};