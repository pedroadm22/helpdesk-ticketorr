import { db } from "@/infrastructure/db";
import { user } from "@/infrastructure/db/schema/auth";
import { eq } from "drizzle-orm";

interface UsuarioSocketDTO {
  id: string;
  name: string;
  role: "CLIENTE" | "TECNICO" | "ADMIN";
}

export async function autenticarUsuarioSocketUseCase(usuarioId: string): Promise<UsuarioSocketDTO | null> {
  if (!usuarioId) return null;

  try {
    const [usuario] = await db
      .select({
        id: user.id,
        name: user.name,
        role: user.role,
      })
      .from(user)
      .where(eq(user.id, usuarioId))
      .limit(1);

    if (!usuario) return null;

    return {
      id: usuario.id,
      name: usuario.name || "Usuário",
      role: (usuario.role as "CLIENTE" | "TECNICO" | "ADMIN") || "CLIENTE",
    };
  } catch (error) {
    console.error("❌ Erro no caso de uso de autenticação do socket:", error);
    return null;
  }
}