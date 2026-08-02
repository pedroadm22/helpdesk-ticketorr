// src/modules/auth/use-cases/get-session-user.use-case.ts
import { SessionUserDTO } from "../dtos/session-user.dto";
import { IUserRepository } from "@/modules/users/repositories/user-repository.interface";

export function createGetSessionUserUseCase(userRepository: IUserRepository) {
  return async (userId: string): Promise<SessionUserDTO> => {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new Error("Sessão inválida ou usuário inativo.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId: user.departmentId,
    };
  };
}