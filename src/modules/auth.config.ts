// src/auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Redireciona para cá se o usuário não estiver logado
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isViewingDashboard = nextUrl.pathname.startsWith("/ticket");

      if (isViewingDashboard) {
        if (isLoggedIn) return true;
        return false; // Redireciona não autenticados para o login
      }
      return true;
    },
  },
  providers: [], // Deixamos vazio aqui e preenchemos no auth.ts
} satisfies NextAuthConfig;