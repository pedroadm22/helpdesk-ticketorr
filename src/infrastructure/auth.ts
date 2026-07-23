import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db"; 
import * as schema from "./db/schema/auth"; // Ajuste o caminho se necessário

export const auth = betterAuth({
  // 🌟 Usar variável de ambiente com fallback para dev
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000/",

  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: schema, // Passa o schema completo exportado do Drizzle
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CLIENT",
        input: false, // 🛡️ Impedir que o usuário defina sua própria role no cadastro público
      },
    },
  },

  emailAndPassword: {
    enabled: true,
    // Permite login automaticamente após a criação da conta (se desejado)
    autoSignIn: true, 
  },
});