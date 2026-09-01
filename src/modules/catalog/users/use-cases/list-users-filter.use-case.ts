import type { IUserRepository } from "../repositories/user-repository";
import type { ListUsersFilterDTO } from "../dtos/list-users.dto";
import type { UserResponseDTO } from "../dtos/user-response.dto";

export const listUsersUseCase = (userRepository: IUserRepository) => {
  return {
    execute: async (filters?: ListUsersFilterDTO): Promise<UserResponseDTO[]> => {
      return await userRepository.findAll(filters);
    },
  };
};