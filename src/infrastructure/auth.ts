// src/infrastructure/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index"; 
import * as schema from "./schemas/schema"; 
import { UserRole } from '@/shared/types/domain/user';

export const auth = betterAuth({
  baseURL: "http://localhost:3000",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
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
        type: "string", // Perfeito. Infraestrutura lida apenas com primitivos
        required: true,
        defaultValue: "CLIENTE",
      },
    },
  },
  emailAndPassword: {
    enabled: true, 
  },
});
