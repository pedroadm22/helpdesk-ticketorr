// src/modules/tickets/dtos/AtualizarTicketDTO.ts
import { z } from "zod";

// 1. Criamos o Schema base com as regras de validação
export const AtualizarTicketSchema = z.object({
  id: z.uuid("O ID do ticket precisa ser um UUID válido"),
  titulo: z.string().min(5, "O título deve ter pelo menos 5 caracteres").optional(),
  descricao: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").optional(),
  tecnicoId: z.uuid("ID do técnico inválido").nullable().optional(), // .nullable() permite remover o técnico do ticket
  statusId: z.number().int().positive().optional(),
  prioridadeId: z.number().int().positive().optional(),
  atualizadoEm: z.number().int().positive().optional(), // Timestamp em milissegundos
});

// 2. Extraímos a tipagem do TypeScript para usar nos parâmetros de funções
export type AtualizarTicketInput = z.infer<typeof AtualizarTicketSchema>;