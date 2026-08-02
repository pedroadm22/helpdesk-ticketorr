// src/modules/auth/use-cases/authenticate-socket.use-case.ts
import {
  AuthenticateUserSocketDTO,
  authenticateUserSocketSchema,
} from "../dtos/autenticate-user-socket.dto";
import { SessionUserDTO } from "../dtos/session-user.dto";

type VerifyTokenFn = (token: string) => Promise<SessionUserDTO | null>;

export function createAuthenticateSocketUseCase(verifyToken: VerifyTokenFn) {
  return async (
    dto: AuthenticateUserSocketDTO
  ): Promise<{ authenticated: boolean; user: SessionUserDTO }> => {
    // 1. Valida a estrutura da requisição
    const { token } = authenticateUserSocketSchema.parse(dto);

    // 2. Valida a assinatura do token
    const user = await verifyToken(token);
    if (!user) {
      throw new Error("Token de conexão WebSocket inválido ou expirado.");
    }

    return {
      authenticated: true,
      user,
    };
  };
}