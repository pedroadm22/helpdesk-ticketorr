// src/modules/tickets/dtos/criar-ticket.dto.ts
import { z } from "zod";
import crypto from "crypto";

// 1. Schema do Zod para validação em tempo de execução (Runtime)
export const criarTicketSchema = z.object({
  id: z
    .string()
    .uuid({ message: "O ID do ticket deve ser un UUID válido." })
    .default(() => crypto.randomUUID()), // Gera automaticamente se omitido
  
  titulo: z
    .string()
    .min(5, { message: "O título deve ter pelo menos 5 caracteres." })
    .max(100, { message: "O título deve ter no máximo 100 caracteres." }),
  
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." }),
  
  prioridadeId: z
    .string()
    .min(1, { message: "A prioridade é obrigatória." }),
  
  setorId: z
    .string()
    .min(1, { message: "O setor da TI é obrigatório." }),
  
  servicoId: z
    .string()
    .min(1, { message: "O tipo de serviço é obrigatório." }),
  
  clienteId: z
    .string()
    .min(1, { message: "O ID do cliente é obrigatório." }),
});

// 2. Tipagem do TypeScript extraída automaticamente do Zod (Compile-time)
export type CriarTicketInputDTO = z.input<typeof criarTicketSchema>;  // O que a API recebe (pode não ter ID)
export type CriarTicketOutputDTO = z.infer<typeof criarTicketSchema>; // O que o Use Case consome (garante que tem ID)