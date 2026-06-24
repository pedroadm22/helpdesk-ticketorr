// src/infrastructure/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schemas/schema"; 

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    // Passamos explicitamente o mapeamento que o Better Auth exige
    schema: {
      user: schema.users,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});