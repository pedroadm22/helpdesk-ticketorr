// src/config/env.ts

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  APP_URL: process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

  // Banco de Dados (Drizzle ORM)
  DATABASE_URL:
    process.env.DATABASE_URL ??
    "postgresql://postgres.jeafddcipmqvumhuktrk:supabase123$@aws-0-sa-east-1.pooler.supabase.com:6543/postgres",
  DIRECT_URL:
    process.env.DIRECT_URL ??
    "postgresql://postgres.jeafddcipmqvumhuktrk:supabase123$@aws-0-sa-east-1.pooler.supabase.com:5432/postgres",

  // Supabase (Cliente e Servidor)
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://jeafddcipmqvumhuktrk.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  SUPABASE_SERVICE_ROLE_KEY:
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",

  // Auth Interna (JWT)
  JWT_SECRET:
    process.env.JWT_SECRET ?? "sua_chave_jwt_secreta_com_mais_de_32_caracteres_aqui_12345",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "7d",

  // Public App URL
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
};