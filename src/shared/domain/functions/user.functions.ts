import { User } from '../types/user.type';
import { SafeUser } from '../types/safe-user.type';
import { UserRole } from '../types/user-role.type';

// 1. Sanitização
export const sanitizeUser = (user: User): SafeUser => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...safeUser } = user;
  return Object.freeze(safeUser);
};

// 2. Permissões (RBAC)
export type Permission = 'CREATE_TICKET' | 'VIEW_ALL_TICKETS' | 'ASSIGN_TICKET' | 'MANAGE_USERS';

const ROLE_PERMISSIONS: Record<UserRole, readonly Permission[]> = {
  ADMIN: ['CREATE_TICKET', 'VIEW_ALL_TICKETS', 'ASSIGN_TICKET', 'MANAGE_USERS'],
  AGENT: ['CREATE_TICKET', 'VIEW_ALL_TICKETS', 'ASSIGN_TICKET'],
  CLIENT: ['CREATE_TICKET'],
};

export const hasPermission = (user: User, permission: Permission): boolean => {
  if (!user.active) return false;
  return ROLE_PERMISSIONS[user.role]?.includes(permission) ?? false;
};

// 3. Modificações Imutáveis
export const deactivateUser = (user: User, now = new Date()): User => {
  if (!user.active) return user;
  return Object.freeze({ ...user, active: false, updatedAt: now });
};