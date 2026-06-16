// src/infrastructure/db/seed.ts
import { db } from "./index"; // Ajuste para o caminho do seu arquivo de conexão
import { statusChamado, prioridadesChamado, users } from "../schemas/schema";

async function main() {
  console.log("🌱 Populando banco de dados com dados iniciais...");

  // 1. Limpa ou insere os Status padrões de Helpdesk
  // Forçamos os IDs para garantir que casem com as Actions
  await db.insert(statusChamado).values([
    { id: 1, nome: "Aberto" },
    { id: 2, nome: "Em Atendimento" },
    { id: 3, nome: "Pendente" },
    { id: 4, nome: "Resolvido" },
    { id: 5, nome: "Fechado" },
  ]).onConflictDoNothing();

  // 2. Popula as Prioridades com IDs sequenciais previsíveis
  await db.insert(prioridadesChamado).values([
    { id: 1, nome: "Baixa" },
    { id: 2, nome: "Média" },
    { id: 3, nome: "Alta" },
    { id: 4, nome: "Crítica" },
  ]).onConflictDoNothing();

  // 3. Cria um usuário de teste caso você precise testar a Action manualmente
  await db.insert(users).values({
    id: "7ffac769-c3ea-433b-b883-9bf473b508c0", // Mude para o ID que você está enviando no payload da Action
    nome: "Usuário de Teste",
    email: "teste@ticketorr.com",
    perfil: "CLIENTE",
  }).onConflictDoNothing();

  console.log("✅ Banco de dados sincronizado e pronto para operação!");
}

main().catch((err) => {
  console.error("❌ Erro ao rodar o seed:", err);
  process.exit(1);
});