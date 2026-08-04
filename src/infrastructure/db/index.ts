// src/infrastructure/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js"; // ou drizzle-orm/node-postgres
import postgres from "postgres";
import * as schema from "./schema"; // 🟢 Precisa importar TUDO do schema como objeto

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema });