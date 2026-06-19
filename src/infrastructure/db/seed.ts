// src/infrastructure/db/seed.ts
import { db } from "./index"; 
import { statusChamado, prioridadesChamado, users } from "../schemas/schema";
import { hashSync } from "bcrypt-ts"; // 🟢 Importamos o bcrypt para o seed

async function main() {
  console.log("🌱 Populando banco de dados SQLite com dados iniciais...");

  // 1. Status padrões de Helpdesk
  await db.insert(statusChamado).values([
    { id: 1, nome: "Aberto" },
    { id: 2, nome: "Em Atendimento" },
    { id: 3, nome: "Pendente" },
    { id: 4, nome: "Resolvido" },
    { id: 5, nome: "Fechado" },
  ]).onConflictDoNothing();

  // 2. Prioridades com IDs sequenciais previsíveis
  await db.insert(prioridadesChamado).values([
    { id: 1, nome: "Baixa" },
    { id: 2, nome: "Média" },
    { id: 3, nome: "Alta" },
    { id: 4, nome: "Crítica" },
  ]).onConflictDoNothing();

  // 3. Cria um usuário de teste com uma senha criptografada válida
  // Geramos um hash profissional para a senha "123456" para você conseguir logar com ele
  const senhaTestehash = hashSync("123456", 10);

  await db.insert(users).values({
    id: "7ffac769-c3ea-433b-b883-9bf473b508c0", // Seu UUID estático funciona lindo no SQLite
    nome: "Usuário de Teste",
    email: "teste@ticketorr.com",
    senhaHash: hashSync("123456", 10), // 👈 Usando senhaHash aqui!
    perfil: "CLIENTE",
  }).onConflictDoNothing();

  console.log("✅ Banco de dados sincronizado e pronto para operação!");
}

main().catch((err) => {
  console.error("❌ Erro ao rodar o seed:", err);
  process.exit(1);
});