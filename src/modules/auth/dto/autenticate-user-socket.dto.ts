import { z } from "zod";

export const autenticarUsuarioSocketSchema = z.object({
  usuarioId: z
    .string({ message: "O ID do usuário é obrigatório para autenticar o socket." })
    .uuid("O ID do usuário fornecido para o socket precisa ser um UUID válido."),
});

export type AutenticarUsuarioSocketInput = z.infer<typeof autenticarUsuarioSocketSchema>;

// Tipo para a Role padronizada do sistema
export type SocketUserRole = "CLIENT" | "TECHNICIAN" | "ADMIN";

// Interface para o retorno seguro do usuário autenticado
export interface SocketUserOutput {
  id: string;
  name: string;
  role: SocketUserRole;
}