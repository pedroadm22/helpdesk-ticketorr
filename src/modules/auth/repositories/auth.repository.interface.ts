import { user, session } from "@/infrastructure/db/schema/auth";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto"; // 👈 Importe o DTO do login

export type UserEntity = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
export type SessionEntity = typeof session.$inferSelect;

export type AuthSessionResult = {
  user: UserEntity;
  session: SessionEntity;
} | null;

// Tipo de retorno para a operação de autenticação
export type AuthResponse = {
  success: boolean;
  message?: string;
};

export interface IAuthRepository {
  // 🔑 Adicione o método de login aqui:
  signInWithEmail(credentials: LoginInputDto): Promise<AuthResponse>;

  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(role?: string): Promise<UserEntity[]>;
  updateUser(id: string, data: Partial<UserInsert>): Promise<UserEntity | null>;
  deleteUser(id: string): Promise<boolean>;

  // 🔒 Métodos auxiliares de Sessão (servidor)
  getSessionFromHeaders(headers: Headers): Promise<AuthSessionResult>;
}