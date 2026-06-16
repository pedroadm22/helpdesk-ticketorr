"use server";

import { revalidatePath } from "next/cache";
import { criarTicketUseCase } from "../use-cases/CriarTicketUseCase";
import { criarTicketSchema } from "../dto/CriarTicketDto";

export async function criarTicketAction(formData: FormData) {
  // 1. Extrai os dados brutos de dentro do FormData do HTML
  const dadosBrutos = {
    titulo: formData.get("titulo"),
    descricao: formData.get("descricao"),
    prioridadeId: formData.get("prioridadeId"),
  };

  // 2. Validação Rígida com o Schema do Zod
  const resultadoValidacao = criarTicketSchema.safeParse(dadosBrutos);

  // Se a validação falhar, retorna os erros formatados por campo para o Hook mapear na tela
  if (!resultadoValidacao.success) {
    return {
      success: false,
      errors: resultadoValidacao.error.flatten().fieldErrors,
    };
  }

  try {
    // 3. Identificação do Cliente (Tenant/Usuário)
    // ID mocado temporariamente. Quando você colocar o NextAuth, pegamos da sessão do usuário logado.
    const clienteIdMocado = "7ffac769-c3ea-433b-b883-9bf473b508c0"; 

    // 4. Chama o UseCase inteligente (que gera protocolo dinâmico e calcula SLA)
    const ticketId = await criarTicketUseCase({
      titulo: resultadoValidacao.data.titulo,
      descricao: resultadoValidacao.data.descricao,
      prioridadeId: resultadoValidacao.data.prioridadeId,
      clienteId: clienteIdMocado,
    });

    // 5. Destruição de Cache (On-Demand Revalidation)
    // Força o Next.js a atualizar os dados do Dashboard e da Fila na hora!
    revalidatePath("/");
    revalidatePath("/chamados");

    return { 
      success: true, 
      ticketId 
    };

  } catch (error) {
    console.dir(error);
    console.error("❌ Erro catastrófico na Action de criar chamado:", error);
    
    return { 
      success: false, 
      message: "Não foi possível salvar o chamado no banco de dados. Tente novamente." 
    };
  }
}