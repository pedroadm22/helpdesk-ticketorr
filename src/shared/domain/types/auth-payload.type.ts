import { UserRole } from './domain/types/user-role.type';

export type JwtPayload = Readonly<{
  sub: string; // ID do usuário
  email: string;
  name: string;
  role: UserRole;
  departmentId: string | null;
  iat?: number;
  exp?: number;
}>;

export type UserAuthSession = Readonly<{
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    departmentId: string | null;
  };
  accessToken: string;
  refreshToken: string;
}