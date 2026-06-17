import { z } from "zod";

// 1. Definição do Schema do Zod para Validação em Tempo de Execução
export const criarTicketSchema = z.object({
  titulo: z
    .string()
    .min(5, { message: "O título do chamado precisa ter pelo menos 5 caracteres." })
    .max(100, { message: "O título está muito longo (máximo de 100 caracteres)." }),
  
  descricao: z
    .string()
    .min(10, { message: "Por favor, detalhe melhor o problema (mínimo de 10 caracteres)." }),
  
  prioridadeId: z
    .coerce // Converte automaticamente o valor vindo do <select> (que chega como string) para number
    .number()
    .int()
    .min(1, { message: "Prioridade inválida." })
    .max(4, { message: "Prioridade inválida." }),

  // O ID do cliente é opcional no payload do formulário do front-end, 
  // pois será injetado pela Server Action no servidor por segurança.
  clienteId: z
    .string()
    .uuid({ message: "O identificador do cliente precisa ser um UUID válido." })
    .optional(),
});

// 2. Inferência de Tipo para o TypeScript (Contrato Estático)
export type CriarTicketInputDto = z.infer<typeof criarTicketSchema>;