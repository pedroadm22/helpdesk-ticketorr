import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { auth } from "@/infrastructure/auth"; // Instância configurada do Better Auth
import { users } from "@/infrastructure/db/schema/auth"; // Ajuste para o seu schema
import {
  IAuthRepository,
  UserEntity,
  UserInsert,
  AuthSessionResult,
  AuthResponse,
} from "./auth.repository.interface";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto";

export class AuthRepository implements IAuthRepository {

  async signInWithEmail({ email, password }: LoginInputDto): Promise<AuthResponse> {
    try {
      const response = await auth.api.signInEmail({
        body: { email, password },
      });

      if (!response) {
        return { success: false, message: "Credenciais inválidas." };
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || "Erro ao realizar autenticação.",
      };
    }
  }

  async findById(id: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return foundUser || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return foundUser || null;
  }

  async findAll(role?: string): Promise<UserEntity[]> {
    if (role && "role" in users) {
      return await db
        .select()
        .from(users)
        .where(eq(users.role as any, role));
    }

    return await db.select().from(users);
  }

  async updateUser(
    id: string,
    data: Partial<UserInsert>
  ): Promise<UserEntity | null> {
    const [updated] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(), // Ou .toISOString() se sua coluna for texto
      })
      .where(eq(users.id, id))
      .returning();

    return updated || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return !!deleted;
  }

  // 🔒 Valida a sessão usando a API nativa do Better Auth
  async getSessionFromHeaders(headers: Headers): Promise<AuthSessionResult> {
    try {
      const sessionData = await auth.api.getSession({
        headers,
      });

      if (!sessionData) return null;

      return {
        user: sessionData.user as UserEntity,
        session: sessionData.session as any,
      };
    } catch (error) {
      console.error("Erro ao validar sessão do Better Auth:", error);
      return null;
    }
  }
}