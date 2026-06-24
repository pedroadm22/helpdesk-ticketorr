import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schemas/schema";
import { auth } from "../auth";
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db"); // Certifique-se de usar o mesmo caminho do seu db.ts
const db = drizzle(sqlite, { schema });

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  try {
    // 1. Popula as Tabelas Auxiliares de Status (se estiverem vazias)
    console.log("📦 Inserindo status de chamados...");
    const statusExistentes = await db.select().from(schema.statusChamado);
    if (statusExistentes.length === 0) {
      await db.insert(schema.statusChamado).values([
        { id: 1, name: "Aberto" },
        { id: 2, name: "Em Atendimento" },
        { id: 3, name: "Aguardando Cliente" },
        { id: 4, name: "Resolvido" },
        { id: 5, name: "Fechado" },
      ]);
    }

    // 2. Popula as Tabelas Auxiliares de Prioridade (se estiverem vazias)
    console.log("📦 Inserindo prioridades...");
    const prioridadesExistentes = await db.select().from(schema.prioridadesChamado);
    if (prioridadesExistentes.length === 0) {
      await db.insert(schema.prioridadesChamado).values([
        { id: 1, name: "Baixa" },
        { id: 2, name: "Média" },
        { id: 3, name: "Alta" },
        { id: 4, name: "Crítica" },
      ]);
    }

    // 3. Criando Usuários de Teste através da API do Better Auth (para garantir o hash da senha)
    console.log("👤 Criando usuários de teste...");

    // Teste 1: Usuário Técnico de TI
    const tecnicoEmail = "tecnico@ticketorr.com";
    const tecnicoExiste = await db.select().from(schema.users).where(eq(schema.users.email, tecnicoEmail));
    
    if (tecnicoExiste.length === 0) {
      const tecnicoNovo = await auth.api.signUpEmail({
        body: {
          email: tecnicoEmail,
          password: "SenhaSegura123",
          name: "Suporte Técnico",
        },
      });

      // Como o Better Auth cria por padrão como CLIENTE, nós atualizamos o papel (role) para TECNICO
      if (tecnicoNovo) {
        await db
          .update(schema.users)
          .set({ role: "TECNICO" })
          .where(eq(schema.users.id, tecnicoNovo.user.id));
        console.log(`✅ Técnico criado com sucesso! (ID: ${tecnicoNovo.user.id})`);
      }
    } else {
      console.log("ℹ️ Usuário técnico já existe.");
    }

    // Teste 2: Usuário Cliente Padrão
    const clienteEmail = "cliente@exemplo.com";
    const clienteExiste = await db.select().from(schema.users).where(eq(schema.users.email, clienteEmail));

    if (clienteExiste.length === 0) {
      const clienteNovo = await auth.api.signUpEmail({
        body: {
          email: clienteEmail,
          password: "ClienteSenha123",
          name: "Pedro Lucas",
        },
      });
      if (clienteNovo) {
        console.log(`✅ Cliente criado com sucesso! (ID: ${clienteNovo.user.id})`);
      }
    } else {
      console.log("ℹ️ Usuário cliente já existe.");
    }

    console.log("✨ Seeding finalizado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao rodar o seed:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

main();