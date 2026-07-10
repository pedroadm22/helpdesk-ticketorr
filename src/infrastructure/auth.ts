// src/infrastructure/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index"; 
// 🌟 MUDANÇA AQUI: Importa absolutamente tudo do seu arquivo de tabelas sob o apelido 'schema'
import * as schema from "./schemas/schema"; 

export const auth = betterAuth({
  baseURL: "https://ticketorr.vercel.app/app/api/auth/",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      // 🌟 MUDANÇA AQUI: Mapeia diretamente o objeto exportado do arquivo físico
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
      rememberMe: true,
    },
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CLIENTE",
      },
    },
  },
  emailAndPassword: {
    enabled: true, 
  },
});