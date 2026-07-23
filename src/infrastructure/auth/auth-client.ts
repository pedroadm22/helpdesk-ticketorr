import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "../auth"; // Importa estritamente como tipo (não gera código no bundle final)

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/",
  
  // 🌟 O plugin oficial que lê a sua configuração do servidor e gera 
  // automaticamente as tipagens do 'data' e do 'role' no cliente
  plugins: [
    inferAdditionalFields<typeof auth>()
  ]
});

export const { signIn, signUp, signOut, useSession } = authClient;