import { authRepository } from "../repositories/auth.repository";

export interface CurrentUserDTO {
  id: string;
  email: string;
  name: string | null;
  role: "CLIENT" | "TECHNICIAN" | "ADMIN";
}

export async function getCurrentUserUseCase(): Promise<CurrentUserDTO | null> {
  // 1. Obtém a sessão ativa no Supabase Auth pelo repositório
  const session = await authRepository.getSession();

  if (!session?.user?.id) {
    return null;
  }

  // 2. Busca o perfil completo (incluindo nome e role) na tabela pública via repositório
  const profile = await authRepository.findById(session.user.id);

  if (!profile) {
    return null;
  }

  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    role: (profile.role as "CLIENT" | "TECHNICIAN" | "ADMIN") || "CLIENT",
  };
}