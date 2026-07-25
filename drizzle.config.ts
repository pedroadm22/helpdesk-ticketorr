// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Carrega as variáveis do .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  // Caminho para a exportação centralizada dos seus schemas TypeScript
  schema: "./src/infrastructure/db/schema/index.ts",
  
  // Onde os arquivos SQL gerados pelo Drizzle Kit serão salvos
  out: "./src/infrastructure/db/migrations",
  
  dialect: "postgresql",
  
  dbCredentials: {
    // Dá preferência ao DIRECT_URL (sessão direta sem pooling de transação para alterar DDL)
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
  
  // Opcional: exibe logs detalhados do SQL que está sendo executado no terminal
  verbose: true,
  strict: true,
});