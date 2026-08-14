import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schemas";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is missing.");
}

// 1. Cliente postgres.js ajustado para o Transaction Pooler do Supabase
const queryClient = postgres(connectionString, {
  prepare: false, // Necessário para o PgBouncer/Supabase Pooler
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// 2. Cast da própria função 'drizzle' desativa a validação rígida de sobrecarga do TypeScript
export const db = (drizzle as any)(queryClient, { schema });

// 3. Prevenção de re-conexões no Next.js (Hot Reload)
const globalForDb = globalThis as unknown as {
  db: typeof db | undefined;
};

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

export type DatabaseInstance = typeof db;