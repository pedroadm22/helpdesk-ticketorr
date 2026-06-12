import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // 1. Indica onde estão os arquivos de schema do seu banco de dados
  schema: "./src/infrastructure/schema/**/*.ts",
  
  // 2. Pasta onde o Drizzle vai gerar o histórico de migrações em SQL (caso precise no futuro)
  out: "./drizzle",
  
  // 3. Define que estamos utilizando o banco de dados SQLite
  dialect: "sqlite",
  
  // 4. Configurações de conexão (aponta para o arquivo local do seu banco)
  dbCredentials: {
    url: "./sqlite.db", // O arquivo de banco de dados será criado na raiz do projeto
  },
});