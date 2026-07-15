"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/infrastructure/auth"; // 🌟 Importa o motor do Better Auth do servidor
import { headers } from "next/headers"; // Necessário para o Better Auth ler os cookies na Action
import { criarTicketUseCase } from "../use-cases/CriarTicketUseCase";
import { criarTicketSchema } from "../dto/CreateTicketDto";

export async function criarTicketAction(formData: FormData) {
  // 1. Recupera a sessão do usuário logado de forma real
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Se por algum motivo bizarro o usuário não estiver logado, barra na hora
  if (!session || !session.user) {
    return {
      success: false,
      message: "Sessão expirada. Faça login novamente.",
    };
  }

  // 2. Extrai os dados brutos e converte tipos se necessário
  const dadosBrutos = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    // Converte para número caso o seu Schema do Zod/Banco espere um Inteiro
    prioridadeId: Number(formData.get("prioridadeId")), 
  };

  // 3. Validação Rígida com o Schema do Zod
  const resultadoValidacao = criarTicketSchema.safeParse(dadosBrutos);

  if (!resultadoValidacao.success) {
    return {
      success: false,
      errors: resultadoValidacao.error.flatten().fieldErrors,
    };
  }

  try {
    // 4. Chama o UseCase passando o ID real do usuário vindo do Better Auth!
    const ticketId = await criarTicketUseCase({
      titulo: resultadoValidacao.data.titulo,
      descricao: resultadoValidacao.data.descricao,
      prioridadeId: resultadoValidacao.data.prioridadeId,
      clienteId: session.user.id, // 🌟 DINÂMICO: Fim do ID mocado!
    });

    // 5. Destruição de Cache (On-Demand Revalidation)
    // Atualiza os caminhos baseados na estrutura que corrigimos
    revalidatePath("/dashboard");
    revalidatePath("/ticket");

    return { 
      success: true, 
      ticketId 
    };

  } catch (error) {
    console.error("❌ Erro catastrófico na Action de criar chamado:", error);
    
    return { 
      success: false, 
      message: "Não foi possível salvar o chamado no banco de dados. Verifique os campos e tente novamente." 
    };
  }
}