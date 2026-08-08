import { UserRole } from './user-role.type';

export type User = Readonly<{
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  departmentId: string | null;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}>;