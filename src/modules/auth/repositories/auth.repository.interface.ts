import { user, session } from "@/infrastructure/db/schema/auth"; // Ajuste o caminho do seu schema do Better Auth

// 🌟 Tipos exportados centralizados
export type UserEntity = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;

export type SessionEntity = typeof session.$inferSelect;

// Retorno enriquecido da sessão ativa
export type AuthSessionResult = {
  user: UserEntity;
  session: SessionEntity;
} | null;

export interface IAuthRepository {
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(role?: string): Promise<UserEntity[]>;
  updateUser(id: string, data: Partial<UserInsert>): Promise<UserEntity | null>;
  deleteUser(id: string): Promise<boolean>;
  
  // 🔒 Métodos auxiliares de Sessão (servidor)
  getSessionFromHeaders(headers: Headers): Promise<AuthSessionResult>;
}