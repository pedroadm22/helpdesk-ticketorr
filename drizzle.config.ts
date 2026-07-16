import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infrastructure/db/schema/index.ts", // Aponta para o index que você acabou de ajustar
  out: "./src/infrastructure/db/migrations",         // Aponta para a sua pasta de migrações
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL || "sqlite.db",
  },
});