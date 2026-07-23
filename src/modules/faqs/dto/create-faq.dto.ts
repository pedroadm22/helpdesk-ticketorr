import { z } from "zod";

// DTO para Criação de FAQ
export const CreateFaqSchema = z.object({
  question: z.string().min(5, "A pergunta do FAQ deve ter pelo menos 5 caracteres"),
  answer: z.string().min(10, "A resposta do FAQ deve ser mais detalhada"),
  
  // Campos opcionais de controle e rotas amigáveis
  slug: z.string().toLowerCase().optional(),
  isActive: z.boolean().optional().default(true),
  
  // Vínculos automáticos (herdando da sua estrutura de departamentos e serviços)
  departmentId: z.string().optional().nullable(),
  serviceId: z.string().optional().nullable(),
});

export type CreateFaqInput = z.infer<typeof CreateFaqSchema>;

// DTO para Atualização (torna todos os campos anteriores opcionais de forma segura)
export const UpdateFaqSchema = CreateFaqSchema.partial();

export type UpdateFaqInput = z.infer<typeof UpdateFaqSchema>;