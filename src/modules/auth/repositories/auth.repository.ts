import { eq } from "drizzle-orm";
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema/auth";
import { createClient } from "@/infrastructure/supabase/server";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto";

export type UserEntity = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type AuthResponse =
  | { success: true }
  | { success: false; message: string };

export const authRepository = {
  // ➕ NOVO MÉTODO: Cria o perfil na tabela publica (public.users)
  async createUserProfile(data: UserInsert): Promise<UserEntity> {
    const [newUser] = await db
      .insert(users)
      .values(data)
      .returning();

    if (!newUser) {
      throw new Error("Falha ao registrar o perfil do usuário no banco de dados.");
    }

    return newUser;
  },

  // Login com Supabase Auth
  async signInWithEmail({ email, password }: LoginInputDto): Promise<AuthResponse> {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true };
  },

  // Logout
  async signOut(): Promise<void> {
    const supabase = await createClient();
    await supabase.auth.signOut();
  },

  // Busca por ID na tabela pública
  async findById(id: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return foundUser || null;
  },

  // Busca por E-mail na tabela pública
  async findByEmail(email: string): Promise<UserEntity | null> {
    const [foundUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return foundUser || null;
  },

  // Obter sessão ativa no servidor
  async getSession() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) return null;

    return {
      user: {
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name ?? null,
        role: user.user_metadata?.role ?? "CLIENT",
      },
    };
  },
};