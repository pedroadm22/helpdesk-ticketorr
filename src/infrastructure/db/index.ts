// src/infrastructure/db.ts
import { drizzle } from "drizzle-orm/better-sqlite3"; 
import Database from "better-sqlite3";
import * as schema from "../schemas/schema"; 

const sqlite = new Database("sqlite.db");

export const db = drizzle(sqlite, { schema }); // O db global precisa do schema completo para as queries funcionarem