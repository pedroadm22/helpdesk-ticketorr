import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schema/ticket";

// Configuração para evitar múltiplas conexões no Hot Reload do Next.js
const globalForDrizzle = globalThis as unknown as {
  conn: Database.Database | undefined;
};

// Se já existir uma conexão global (em dev), reaproveita. Se não, cria uma nova.
const sqlite = globalForDrizzle.conn ?? new Database("sqlite.db");

if (process.env.NODE_ENV !== "production") {
  globalForDrizzle.conn = sqlite;
}

// Cria e exporta o cliente do Drizzle totalmente tipado com o seu schema
export const db = drizzle(sqlite, { schema });