// src/lib/auth-client.ts
import { createAuthClient } from "@neondatabase/auth";
import { env } from "@/config/env"; // Seu env validado com Zod

// 🟢 Passe a URL diretamente como string
export const authClient = createAuthClient(env.NEXT_PUBLIC_NEON_AUTH_URL);