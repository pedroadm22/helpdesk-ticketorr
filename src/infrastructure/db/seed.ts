import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schema/ticket";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite, { schema });

function gerarDataSla(horas: number): Date {
  const data = new Date();
  data.setHours(data.getHours() + horas);
  return data;
}

async function main() {
  console.log("🌱 Populando o banco de dados...");

  await db.delete(schema.tickets);
  await db.delete(schema.users);

  // === PASSO 2: DECLARAÇÃO CORRETA COM DESESTRUTURAÇÃO ===
  const [tecnico] = await db.insert(schema.users).values({
    nome: "Pedro Lucas",
    email: "pedro.lucas@ticketorr.com",
    perfil: "TECNICO",
  }).returning();

  const [cliente] = await db.insert(schema.users).values({
    nome: "Empresa Parceira LTDA",
    email: "suporte@parceiro.com",
    perfil: "CLIENTE",
  }).returning();

  console.log("👥 Usuários criados com sucesso!");

  // === PASSO 3: USO DAS VARIÁVEIS ===
  await db.insert(schema.tickets).values([
    {
      protocolo: "TK-2026-001",
      titulo: "Servidor de Monitoramento Offline",
      descricao: "O container do Zabbix parou de responder após queda de energia no datacenter local.",
      clienteId: cliente.id, // 🟢 Agora ele vai encontrar a variável 'cliente' aqui
      tecnicoId: tecnico.id, // 🟢 E a variável 'tecnico' aqui
      statusId: 2, 
      prioridadeId: 4, 
      dataLimiteSla: gerarDataSla(2),
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    },
    {
      protocolo: "TK-2026-002",
      titulo: "Instalação de certificado SSL",
      descricao: "Solicitação para renovar e configurar o certificado HTTPS na API de produção.",
      clienteId: cliente.id, // 🟢 Aqui também
      tecnicoId: null, 
      statusId: 1, 
      prioridadeId: 2, 
      dataLimiteSla: gerarDataSla(24),
      dataCriacao: new Date(),
      dataAtualizacao: new Date(),
    }
  ]);

  console.log("🎫 Chamados de teste criados com sucesso!");
  console.log("✨ Banco de dados estruturado e pronto para o combate!");
}

main().catch((err) => {
  console.error("❌ Erro ao rodar o seed:", err);
  process.exit(1);
});