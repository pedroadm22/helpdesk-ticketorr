import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../schemas/schema"; // Sobe uma pasta para ir para schemas
import { auth } from "../auth"; // Sobe uma pasta para ir para a raiz da infraestrutura
import { eq } from "drizzle-orm";

import { ticketStatuses } from "./schema/statuses";
import { ticketPriorities } from "./schema/priorities";
import { departments } from "./schema/departments";
import { services } from "./schema/services";
import { faqs } from "./schema/faqs";
import { v4 as uuidv4 } from "uuid";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite); // Inicializa localmente para garantir o escopo limpo

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");
  try {
    // Inserindo Status
    // src/infrastructure/db/seed.ts

    async function main() {
      console.log("🌱 Starting database seeding...");

      // 1. Popular Statuses
      console.log("⏱️ Seeding ticket statuses...");
      const statusList = [
        {
          id: "awaiting-triage",
          name: "Awaiting Triage",
          description: "Waiting for technician assignment",
        },
        {
          id: "in-progress",
          name: "In Progress",
          description: "Currently being resolved",
        },
        {
          id: "pending",
          name: "Pending",
          description: "Waiting for client response",
        },
        {
          id: "resolved",
          name: "Resolved",
          description: "Issue resolved, waiting for closure",
        },
        { id: "closed", name: "Closed", description: "Ticket finalized" },
      ];
      for (const status of statusList) {
        await db.insert(ticketStatuses).values(status).onConflictDoNothing();
      }

      // 2. Popular Priorities
      console.log("⚡ Seeding ticket priorities...");
      const priorityList = [
        {
          id: "low",
          name: "Low",
          level: 1,
          description: "Minor issue with workaround",
        },
        {
          id: "medium",
          name: "Medium",
          level: 2,
          description: "Standard business impact",
        },
        {
          id: "high",
          name: "High",
          level: 3,
          description: "Major impact, urgent resolution needed",
        },
        {
          id: "urgent",
          name: "Urgent",
          level: 4,
          description: "Critical system down",
        },
      ];
      for (const priority of priorityList) {
        await db
          .insert(ticketPriorities)
          .values(priority)
          .onConflictDoNothing();
      }

      // 3. Popular um Departamento e Serviço de exemplo
      console.log("🏢 Seeding default Department and Service...");
      const deptId = uuidv4();
      await db
        .insert(departments)
        .values({
          id: deptId,
          name: "IT Support",
          description: "General hardware and software assistance",
        })
        .onConflictDoNothing();

      const serviceId = uuidv4();
      await db
        .insert(services)
        .values({
          id: serviceId,
          departmentId: deptId,
          name: "Password Reset",
          description: "Assistance with system credentials recovery",
        })
        .onConflictDoNothing();

      // 4. Popular FAQs de exemplo para o Robô
      console.log("🤖 Seeding default FAQs for deflection...");
      await db
        .insert(faqs)
        .values({
          id: uuidv4(),
          question: "How do I reset my Windows password?",
          answer:
            "Go to selfservice.company.com, enter your corporate email, and follow the SMS verification steps.",
          departmentId: deptId,
          serviceId: serviceId,
        })
        .onConflictDoNothing();

      console.log("✅ Seeding completed successfully!");
    }

    main().catch((err) => {
      console.error("❌ Seeding failed:", err);
      process.exit(1);
    });

    // Criando Usuário Técnico via Better Auth API
    const tecnicoEmail = "tecnico123@ticketorr.com";
    const tecnicoExiste = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, tecnicoEmail));

    if (tecnicoExiste.length === 0) {
      const tecnicoNovo = await auth.api.signUpEmail({
        body: {
          email: tecnicoEmail,
          password: "senha123456",
          name: "Suporte Técnico",
        },
      });

      if (tecnicoNovo) {
        await db
          .update(schema.user)
          .set({ role: "TECHNICIAN" })
          .where(eq(schema.user.id, tecnicoNovo.user.id));
        console.log(`✅ Técnico criado! ID: ${tecnicoNovo.user.id}`);
      }
    }

    // Criando Usuário Cliente via Better Auth API
    const clienteEmail = "cliente@exemplo.com";
    const clienteExiste = await db
      .select()
      .from(schema.user)
      .where(eq(schema.user.email, clienteEmail));

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
