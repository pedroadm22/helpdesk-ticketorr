import { createClient } from "@/infrastructure/supabase/server"; // Seu cliente Supabase para Server Components / Actions
import { db } from "@/infrastructure/db";
import { users } from "@/infrastructure/db/schema";
import { eq } from "drizzle-orm";

import type { IAuthRepository } from "@/modules/auth/repositories/auth-repository.interface";
import type { LoginDTO, RegisterDTO, ForgotPasswordDTO, ResetPasswordDTO, AuthResponseDTO, } from "@/modules/auth/dtos/index";
import { UserResponseDTO } from "@/modules/catalog/users/dtos";

export const supabaseAuthRepository: IAuthRepository = {
  // 1. LOGIN
  login: async (dto: LoginDTO): Promise<AuthResponseDTO> => {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password,
    });

    if (error || !data.user) {
      throw new Error(error?.message || "E-mail ou senha incorretos.");
    }

    // Busca as informações completas do usuário no nosso banco (Drizzle)
    const user = await db.query.users.findFirst({
      where: eq(users.id, data.user.id),
      with: {
        department: { columns: { id: true, name: true } },
      },
    });

    if (!user) {
      throw new Error("Perfil de usuário não localizado.");
    }

    return {
      user: user as unknown as UserResponseDTO,
      accessToken: data.session?.access_token,
    };
  },

  // 2. CADASTRO PÚBLICO (Sempre como CLIENT)
  register: async (dto: RegisterDTO): Promise<AuthResponseDTO> => {
    const supabase = await createClient();

    // 1º Passo: Cria no serviço de Autenticação do Supabase (auth.users)
    const { data, error } = await supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
      options: {
        data: { name: dto.name },
      },
    });

    if (error || !data.user) {
      throw new Error(error?.message || "Falha ao registrar conta no serviço de autenticação.");
    }

    // 2º Passo: Sincroniza criando a entrada na nossa tabela pública (public.users)
    const [newUser] = await db
      .insert(users)
      .values({
        id: data.user.id, // Garante que o ID do public.users seja O MESMO do auth.users
        name: dto.name,
        email: dto.email,
        role: "CLIENT", // 🔒 Forçado como CLIENT pela regra de negócio
      })
      .returning();

    return {
      user: newUser as unknown as UserResponseDTO,
      accessToken: data.session?.access_token,
    };
  },

  // 3. LOGOUT
  logout: async (): Promise<void> => {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || "Falha ao encerrar a sessão.");
    }
  },

  // 4. OBTER USUÁRIO ATUAL (GET CURRENT USER)
  getCurrentUser: async (): Promise<UserResponseDTO | null> => {
    const supabase = await createClient();

    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return null;
    }

    // Busca o perfil correspondente na nossa tabela Drizzle
    const user = await db.query.users.findFirst({
      where: eq(users.id, authUser.id),
      with: {
        department: { columns: { id: true, name: true } },
      },
    });

    return (user as unknown as UserResponseDTO) || null;
  },

  // 5. SOLICITAR REDEFINIÇÃO DE SENHA (FORGOT PASSWORD)
  forgotPassword: async (dto: ForgotPasswordDTO): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(dto.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
    });

    if (error) {
      throw new Error(error.message || "Falha ao enviar e-mail de recuperação.");
    }
  },

  // 6. REDEFINIR SENHA COM CÓDIGO/TOKEN (RESET PASSWORD)
  resetPassword: async (dto: ResetPasswordDTO): Promise<void> => {
    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
      password: dto.newPassword,
    });

    if (error) {
      throw new Error(error.message || "Falha ao redefinir a senha.");
    }
  },
};