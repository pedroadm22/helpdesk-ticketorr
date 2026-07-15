import { drizzle } from "drizzle-orm/better-sqlite3"; // ou sqlite3 de sua escolha
import Database from "better-sqlite3";
import * as schema from "./schema"; // 🌟 Importa o index da pasta schema que reexporta tudo

const sqlite = new Database("local.db");
export const db = drizzle(sqlite, { schema });