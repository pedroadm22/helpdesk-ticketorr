// src/modules/departments/dto/UpdateDepartmentDto.ts
import { z } from "zod";

export const updateDepartmentSchema = z.object({
  // 1. O ID é estritamente obrigatório para sabermos QUAL registro atualizar
  id: z.uuid({ 
    message: "O ID do departamento fornecido é inválido." 
  }),

  // 2. O nome é opcional, mas se for enviado, deve respeitar a regra de tamanho mínimo
  name: z.string()
    .min(3, { message: "O nome do setor deve ter pelo menos 3 caracteres." })
    .optional(),

  // 3. A descrição é opcional e pode ser anulada (caso queiram apagar a descrição)
  description: z.string()
    .nullable()
    .optional(),
});

// 🌟 O tipo TypeScript extraído para ser usado no Caso de Uso
export type UpdateDepartmentInput = z.infer<typeof updateDepartmentSchema>;