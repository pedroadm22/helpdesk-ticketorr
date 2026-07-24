import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv"; // Para carregar variáveis de ambiente do arquivo .env

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/infrastructure/db/schema/*", 
  out: "./src/infrastructure/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url:process.env.DIRECT_URL!, // Colocando na raiz do projeto, o arquivo sqlite.db é criado automaticamente
  },
});