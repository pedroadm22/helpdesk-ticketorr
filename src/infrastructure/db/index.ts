import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { schema } from "better-auth/client/plugins";

// Cria a conexão direta com o arquivo SQLite na raiz do projeto
const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite);