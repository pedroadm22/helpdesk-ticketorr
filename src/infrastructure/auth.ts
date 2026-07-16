import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/index"; 
import * as schema from "./schemas/schema"; 

export const auth = betterAuth({
  baseURL: "http://localhost:3000/",
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CLIENT",
        input: false, // 🛡️ Continua travado para inputs externos/client-side!
      },
    },
  },
  emailAndPassword: {
    enabled: true, 
  },
});