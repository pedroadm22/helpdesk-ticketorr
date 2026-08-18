import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Explicitly load your custom env file path
dotenv.config({ path: "./.env.local" }); 

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não está definida no arquivo .env");
}

export default defineConfig({
  // Caminho onde estão os seus arquivos de schema
  schema: "./src/infrastructure/db/schemas/",

  
  
  // Pasta para onde as migrações SQL geradas pelo drizzle-kit serão salvas
  out: "./src/infrastructure/db/migrations",
  
  // Dialeto do banco de dados
  dialect: "postgresql",
  
  // Credenciais de acesso ao banco
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },

  // Exibir logs SQL detalhados no terminal
  verbose: true,
  strict: true,
});