import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schema/ticket";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite, { schema });

async function main() {
  console.log("🌱 Populando o banco de dados...");

  // 1. Limpa os dados antigos para evitar duplicidade ao rodar o seed
  await db.delete(schema.tickets);
  await db.delete(schema.users);

  // 2. Cria os usuários iniciais (Um Técnico e um Cliente)
  const [tecnico] = await db.insert(schema.users).values({
    nome: "Pedro Lucas",
    email: "pedro.lucas@ticketorr.com",
    perfil: "TECNICO",
  }).returning(); // O .returning() traz o ID gerado pelo banco na hora

  const [cliente] = await db.insert(schema.users).values({
    nome: "Empresa Parceira LTDA",
    email: "suporte@parceiro.com",
    perfil: "CLIENTE",
  }).returning();

  console.log("👥 Usuários criados com sucesso!");

  // 3. Cria os primeiros chamados de teste ligados a esses usuários
  await db.insert(schema.tickets).values([
    {
      protocolo: "TK-2026-001",
      titulo: "Servidor de Monitoramento Offline",
      descricao: "O container do Zabbix parou de responder após queda de energia no datacenter local.",
      clienteId: cliente.id,
      tecnicoId: tecnico.id,
      statusId: 2, // Em Atendimento
      prioridadeId: 4, // Crítica
    },
    {
      protocolo: "TK-2026-002",
      titulo: "Instalação de certificado SSL",
      descricao: "Solicitação para renovar e configurar o certificado HTTPS na API de produção.",
      clienteId: cliente.id,
      tecnicoId: null, // Aguardando triagem na fila
      statusId: 1, // Aberto
      prioridadeId: 2, // Média
    }
  ]);

  console.log("🎫 Chamados de teste criados com sucesso!");
  console.log("✨ Banco de dados estruturado e pronto para o combate!");
}

main().catch((err) => {
  console.error("❌ Erro ao rodar o seed:", err);
  process.exit(1);
});