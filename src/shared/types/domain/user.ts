// src/shared/types/domain/user.ts

// 1. O tipo simplificado que você queria centralizar
export type UserRole = 'CLIENTE' | 'TECNICO' | 'ADMIN';

// 2. A interface do modelo de domínio do Usuário
export interface User {
  id: string; // UUID
  nome: string;
  email: string;
  role: UserRole; // 🌟 Ajustado de 'perfil' para 'role' para casar com o banco e o auth
  dataCriacao: Date;
}