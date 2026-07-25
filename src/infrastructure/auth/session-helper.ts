import { headers } from "next/headers";
import { auth } from "@/infrastructure/auth"; // Sua instância do Better Auth

// Usuário Mock de Dev (use um ID real do seu banco SQLite)
const DEV_MOCK_SESSION = {
  user: {
    id: "O2jq8gEDodubDyOXq12jQAdR8r4u5IEJ", // 👈 Coloque o ID real do seu usuário de testes no banco
    name: "Desenvolvedor Dev",
    email: "dev@local.com",
    image: null,          
  },
  session: {
    id: "dev-session-id",
    userId: "O2jq8gEDodubDyOXq12jQAdR8r4u5IEJ",
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 ano
  },
};

export async function getCurrentSession() {
  // 🚀 MODO DEV: Se estiver em ambiente de desenvolvimento, retorna a sessão liberada
  if (process.env.NODE_ENV === "development") {
    return DEV_MOCK_SESSION;
  }

  // 🔒 MODO PROD: Busca a sessão real do Better Auth
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Erro ao buscar sessão:", error);
    return null;
  }
}