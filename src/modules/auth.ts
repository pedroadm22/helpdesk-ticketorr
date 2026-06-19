// src/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/schemas/schema";
import { eq } from "drizzle-orm";
import { compareSync } from "bcrypt-ts";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // 1. Valida o formato dos dados que vieram do formulário
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // 2. Busca o usuário no banco SQLite pelo e-mail
        const [user] = await db.select().from(users).where(eq(users.email, email));
        
        // Se o usuário não existir ou não tiver senha cadastrada, barra na hora
        if (!user || !user.senhaHash) return null;

        // 3. Segurança: Compara a senha digitada com o Hash do banco
        const senhaConfere = compareSync(password, user.senhaHash);

        if (senhaConfere) {
          // Retorna os dados que ficarão salvos na sessão (Cookie criptografado)
          return {
            id: user.id,
            name: user.nome,
            email: user.email,
            image: user.perfil, // Truque: Usamos a propriedade image para carregar o Perfil (ADMIN, TECNICO, CLIENTE)
          };
        }

        return null; // Senha errada
      },
    }),
  ],
});