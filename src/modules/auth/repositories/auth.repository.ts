import { RefreshToken } from '@/shared/domain/types/refresh-token.type';
import { CreateRefreshTokenDTO, RevokeRefreshTokenDTO } from '../dtos';

export interface IAuthRepository {
  create(data: CreateRefreshTokenDTO): Promise<RefreshToken>;
  findByTokenHash(tokenHash: RefreshToken['tokenHash']): Promise<RefreshToken | null>;
  revokeById(id: NonNullable<RevokeRefreshTokenDTO['id']>): Promise<void>;
  revokeAllByUserId(userId: NonNullable<RevokeRefreshTokenDTO['userId']>): Promise<void>;
}