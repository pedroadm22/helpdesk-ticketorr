// src/modules/auth/dtos/autenticate-user-socket.dto.ts
import { z } from "zod";

export const authenticateUserSocketSchema = z.object({
  token: z.string().min(1, "Token de autenticação não informado."),
  socketId: z.string().min(1, "ID da conexão Socket inválido."),
});

export type AuthenticateUserSocketDTO = z.infer<typeof authenticateUserSocketSchema>;