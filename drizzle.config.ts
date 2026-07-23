import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/infrastructure/db/schema/*", // Caminho dos seus schemas
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    url:"./sqlite.db", // Colocando na raiz do projeto, o arquivo sqlite.db é criado automaticamente
  },
});