// src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url("DATABASE_URL precisa ser uma URL válida"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  client: {
    NEXT_PUBLIC_NEON_AUTH_URL: z
      .url("NEXT_PUBLIC_NEON_AUTH_URL precisa ser uma URL válida"),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_NEON_AUTH_URL: process.env.NEXT_PUBLIC_NEON_AUTH_URL,
  },
});