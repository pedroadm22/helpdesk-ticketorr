export const ALL_USER_ROLES = ['ADMIN', 'AGENT', 'CLIENT'] as const;

export type UserRole = typeof ALL_USER_ROLES[number];

export const USER_ROLE_LABELS: Readonly<Record<UserRole, string>> = Object.freeze({
  ADMIN: 'Administrador',
  AGENT: 'Atendente / Técnico',
  CLIENT: 'Cliente',
});