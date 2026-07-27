import { authRepository } from "../repositories/auth.repository";

export interface UsuarioSocketDTO {
  id: string;
  name: string;
  role: "CLIENT" | "TECHNICIAN" | "ADMIN";
}

export async function autenticarUsuarioSocketUseCase(
  usuarioId: string
): Promise<UsuarioSocketDTO | null> {
  if (!usuarioId) return null;

  try {
    // 1. Busca o perfil do usuário através do repositório
    const usuario = await authRepository.findById(usuarioId);

    if (!usuario) return null;

    // 2. Mapeia para o DTO do Socket garantindo os enums padronizados em inglês
    return {
      id: usuario.id,
      name: usuario.name || "Usuário",
      role: (usuario.role as "CLIENT" | "TECHNICIAN" | "ADMIN") || "CLIENT",
    };
  } catch (error) {
    console.error("❌ Erro no caso de uso de autenticação do socket:", error);
    return null;
  }
}