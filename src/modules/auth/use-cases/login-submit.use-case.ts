// src/modules/auth/use-cases/login.use-case.ts
import { LoginSubmitDTO, loginSubmitSchema } from "../dtos/login-submit.dto";
import { SessionUserDTO } from "../dtos/session-user.dto";
import { IUserRepository } from "@/modules/users/repositories/user-repository.interface";

type ComparePasswordFn = (password: string, hash: string) => Promise<boolean>;

export function createLoginUseCase(
  userRepository: IUserRepository,
  comparePassword: ComparePasswordFn
) {
  return async (dto: LoginSubmitDTO): Promise<{ user: SessionUserDTO }> => {
    // 1. Valida payload com Zod
    const { email, password } = loginSubmitSchema.parse(dto);

    // 2. Busca usuário pelo e-mail
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Credenciais inválidas.");
    }

    // 3. Valida a senha contra o hash armazenado
    const isPasswordValid = await comparePassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas.");
    }

    // 4. Retorna a sessão limpa (sem passwordHash)
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
      },
    };
  };
}