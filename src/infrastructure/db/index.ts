import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema"; // 👈 Importa TUDO do schema de uma vez só!

// Conexão síncrona com o arquivo do SQLite local
const sqlite = new Database("sqlite.db");

// Instância do Drizzle com a visão completa do banco de dados
export const db = drizzle(sqlite, { schema });