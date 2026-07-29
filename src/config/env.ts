import { z } from "zod";

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  
  // Banco de Dados (Drizzle)
  DATABASE_URL: z.string().min(1, "DATABASE_URL é obrigatória."),
  DIRECT_URL: z.string().min(1, "DIRECT_URL é obrigatória para migrações."),
  
  // Supabase Servidor
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, "SUPABASE_SERVICE_ROLE_KEY é obrigatória."),
  
  // Auth Interna
  JWT_SECRET: z.string().min(32, "JWT_SECRET precisa de no mínimo 32 caracteres."),
  JWT_EXPIRES_IN: z.string().default("7d"),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url("URL do Supabase inválida."),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "ANON_KEY do Supabase é obrigatória."),
});

const _env = serverEnvSchema.merge(clientEnvSchema).safeParse({
  NODE_ENV: process.env.NODE_ENV,
  APP_URL: process.env.APP_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

if (!_env.success) {
  console.error("❌ ERRO: Variáveis de ambiente inválidas ou ausentes:", _env.error.format());
  throw new Error("Falha na validação das variáveis de ambiente.");
}

export const env = _env.data;