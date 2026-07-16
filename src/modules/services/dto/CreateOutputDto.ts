import { z } from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, { 
    message: "O nome do serviço deve ter pelo menos 3 caracteres." 
  }),
  description: z.string().optional(),
  departmentId: z.string().uuid({
    message: "O ID do departamento fornecido é inválido."
  }),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;