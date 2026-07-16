import { z } from "zod";

export const updateServiceSchema = z.object({
  id: z.string().uuid({ 
    message: "O ID do serviço fornecido é inválido." 
  }),
  name: z.string()
    .min(3, { message: "O nome do serviço deve ter pelo menos 3 caracteres." })
    .optional(),
  description: z.string().nullable().optional(),
  departmentId: z.string().uuid().optional(),
});

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;