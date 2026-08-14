import { UserRole } from './user-role.type';

export type UserFilters = Readonly<{
  searchQuery?: string;
  role?: UserRole;
  departmentId?: string;
  active?: boolean;
  page?: number;
  limit?: number;
}>;