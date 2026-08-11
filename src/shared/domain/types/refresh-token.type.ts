import { User } from './user.type';

export type RefreshToken = Readonly<{
  id: string;
  userId: User['id'];
  tokenHash: string;
  expiresAt: Date;
  isRevoked: boolean;
  createdAt: Date;
}>;