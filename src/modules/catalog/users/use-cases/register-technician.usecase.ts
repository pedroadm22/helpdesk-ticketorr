import { authRepository } from "@/modules/auth/repositories/auth.repository";
import { userRepository } from "../repositories/user.repository";
import { RegisterTechnicianDTO, UserResponseDTO } from "../dtos";
import { User } from "@/shared/domain/types/user.type";

export async function RegisterTechnicianUseCase(
  currentUser: User,
  data: RegisterTechnicianDTO
): Promise<UserResponseDTO> { 

  // 1. autorização

  // 2. validações

  // 3. verifica email
  const existingUser =
    await userRepository.findByEmail(data.email);

  if (existingUser) {
    throw new Error("Email já cadastrado.");
  }

  // 4. cria conta no Supabase Auth
  const authData = await authRepository.signUp(
    data.email,
    data.password
  );

  if (!authData.user) {
    throw new Error(
      "Não foi possível criar a conta."
    );
  }

  // 5. cria usuário da aplicação
  return userRepository.create({
    id: authData.user.id,
    name: data.name,
    email: data.email,
    role: "technician",
    departmentId: data.departmentId,
    teamId: data.teamId ?? null,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}