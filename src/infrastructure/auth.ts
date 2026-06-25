import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index"; // Importa o db do index.ts dentro da pasta db
import { users, session, account, verification } from "./schemas/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      users,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});