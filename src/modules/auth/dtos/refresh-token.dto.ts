import { RefreshToken } from '@/shared/domain/types/refresh-token.type';

// DTO para registrar no banco um token gerado
export type CreateRefreshTokenDTO = Pick<
  RefreshToken,
  'userId' | 'tokenHash' | 'expiresAt'
>;

// Payload recebido no corpo da requisição HTTP POST /auth/refresh
export type RefreshTokenPayloadDTO = {
  refreshToken: string;
};

// DTO para revogação/logout
export type RevokeRefreshTokenDTO = {
  id?: RefreshToken['id'];
  userId?: RefreshToken['userId'];
};