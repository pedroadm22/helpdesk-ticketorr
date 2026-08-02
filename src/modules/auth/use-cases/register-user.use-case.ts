// src/modules/auth/use-cases/register.use-case.ts
import { RegisterUserDTO, registerUserSchema } from "../dtos/register-user.dto";
import { SessionUserDTO } from "../dtos/session-user.dto";
import { IUserRepository } from "@/modules/users/repositories/user-repository.interface";

type HashPasswordFn = (password: string) => Promise<string>;

export function createRegisterUseCase(
  userRepository: IUserRepository,
  hashPassword: HashPasswordFn
) {
  return async (dto: RegisterUserDTO): Promise<{ user: SessionUserDTO }> => {
    // 1. Valida entrada
    const validatedData = registerUserSchema.parse(dto);

    // 2. Garante que e-mail não existe
    const existingUser = await userRepository.findByEmail(validatedData.email);
    if (existingUser) {
      throw new Error("Já existe uma conta vinculada a este e-mail.");
    }

    // 3. Hash da senha
    const passwordHash = await hashPassword(validatedData.password);

    // 4. Cria usuário
    const createdUser = await userRepository.create({
      ...validatedData,
      passwordHash,
    });

    return {
      user: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        departmentId: createdUser.departmentId,
      },
    };
  };
}