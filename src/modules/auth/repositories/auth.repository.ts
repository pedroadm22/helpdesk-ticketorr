import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { auth } from "@/infrastructure/auth"; // Instância configurada do Better Auth
import { user } from "@/infrastructure/db/schema/auth"; // Ajuste para o seu schema
import {
  IAuthRepository,
  UserEntity,
  UserInsert,
  AuthSessionResult,
} from "./auth.repository.interface";

export class AuthRepository implements IAuthRepository {
  async findById(id: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.id, id));

    return foundUser || null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email));

    return foundUser || null;
  }

  async findAll(role?: string): Promise<UserEntity[]> {
    if (role && "role" in user) {
      return await db
        .select()
        .from(user)
        .where(eq(user.role as any, role));
    }

    return await db.select().from(user);
  }

  async updateUser(
    id: string,
    data: Partial<UserInsert>
  ): Promise<UserEntity | null> {
    const [updated] = await db
      .update(user)
      .set({
        ...data,
        updatedAt: new Date(), // Ou .toISOString() se sua coluna for texto
      })
      .where(eq(user.id, id))
      .returning();

    return updated || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const [deleted] = await db
      .delete(user)
      .where(eq(user.id, id))
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