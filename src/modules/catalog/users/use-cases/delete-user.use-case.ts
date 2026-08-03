import type { IUserRepository } from "../repositories/user-repository.interface";
import type { DeleteUserDTO } from "../dtos/delete-user.dto";

export const deleteUserUseCase = (userRepository: IUserRepository) => {
  return {
    execute: async (dto: DeleteUserDTO): Promise<boolean> => {
      const user = await userRepository.findById(dto.id);

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      // Se delete() for void, apenas chame com await (sem colocar em if)
      await userRepository.delete(dto.id);

      return true;
    },
  };
};