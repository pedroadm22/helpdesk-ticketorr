import { db } from "./index";
import { user } from "./schema/auth"; // Tabela de usuários para atualizar a role depois
import { departments } from "./schema/departments";
import { services } from "./schema/services";
import { auth } from "@/lib/supabase/"; // Sua instância do Better Auth
import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";

async function main() {
  console.log("🌱 Iniciando o povoamento do banco de dados (Seed)...");

  // 1. Inserir Departamentos
  console.log("📂 Inserindo Departamentos...");
  const [deptTI, deptRH, deptFinanceiro] = await db
    .insert(departments)
    .values([
      {
        id: randomUUID(),
        name: "Tecnologia da Informação",
        description: "Suporte técnico, infraestrutura de redes e sistemas.",
      },
      {
        id: randomUUID(),
        name: "Recursos Humanos",
        description: "Gestão de pessoas e benefícios.",
      },
      {
        id: randomUUID(),
        name: "Financeiro",
        description: "Contas a pagar e reembolsos.",
      },
    ])
    .returning();

  // 2. Inserir Serviços
  console.log("🛠️ Inserindo Serviços...");
  await db.insert(services).values([
    {
      id: randomUUID(),
      name: "Formatação e Configuração de Equipamentos",
      description: "Suporte e configuração de estações de trabalho.",
      departmentId: deptTI.id,
    },
    {
      id: randomUUID(),
      name: "Acesso a Redes e VPN",
      description: "Liberação de acessos corporativos.",
      departmentId: deptTI.id,
    },
  ]);

  // 3. Inserir Usuários via API do Better Auth
  console.log("👤 Criando Usuários de Teste via Better Auth API...");

  // a) Usuário ADMIN
  const adminRes = await auth.api.signUpEmail({
    body: {
      email: "admin@empresa.com",
      password: "12345678",
      name: "Administrador do Sistema",
    },
  });

  if (adminRes?.user) {
    await db
      .update(user)
      .set({ role: "ADMIN" })
      .where(eq(user.id, adminRes.user.id));
  }

  // b) Usuário TÉCNICO
  const tecnicoRes = await auth.api.signUpEmail({
    body: {
      email: "tecnico@empresa.com",
      password: "12345678",
      name: "Pedro Suporte",
    },
  });

  if (tecnicoRes?.user) {
    await db
      .update(user)
      .set({ role: "TECNICO" })
      .where(eq(user.id, tecnicoRes.user.id));
  }

  // c) Usuário CLIENTE
  const clienteRes = await auth.api.signUpEmail({
    body: {
      email: "cliente@empresa.com",
      password: "12345678",
      name: "João Cliente",
    },
  });

  if (clienteRes?.user) {
    await db
      .update(user)
      .set({ role: "CLIENTE" })
      .where(eq(user.id, clienteRes.user.id));
  }

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch((err) => {
    console.error("❌ Erro ao executar o seed:", err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });