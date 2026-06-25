import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schemas/schema"; // Sobe uma pasta para ir para schemas
import { auth } from "../auth"; // Sobe uma pasta para ir para a raiz da infraestrutura
import { eq } from "drizzle-orm";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite); // Inicializa localmente para garantir o escopo limpo

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");
  try {
    // Inserindo Status
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

    // Inserindo Prioridades
    const prioridadesExistentes = await db.select().from(schema.prioridadesChamado);
    if (prioridadesExistentes.length === 0) {
      await db.insert(schema.prioridadesChamado).values([
        { id: 1, name: "Baixa" },
        { id: 2, name: "Média" },
        { id: 3, name: "Alta" },
        { id: 4, name: "Crítica" },
      ]);
    }

    // Criando Usuário Técnico via Better Auth API
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

      if (tecnicoNovo) {
        await db
          .update(schema.users)
          .set({ role: "TECNICO" })
          .where(eq(schema.users.id, tecnicoNovo.user.id));
        console.log(`✅ Técnico criado! ID: ${tecnicoNovo.user.id}`);
      }
    }

    // Criando Usuário Cliente via Better Auth API
    const clienteEmail = "cliente@exemplo.com";
    const clienteExiste = await db.select().from(schema.users).where(eq(schema.users.email, clienteEmail));

    if (clienteExiste.length === 0) {
      await auth.api.signUpEmail({
        body: {
          email: clienteEmail,
          password: "ClienteSenha123",
          name: "Pedro Lucas",
        },
      });
      console.log(`✅ Cliente criado com sucesso!`);
    }

    console.log("✨ Seeding finalizado!");
  } catch (error) {
    console.error("❌ Erro no seed:", error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

main();