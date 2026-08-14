// src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/config/env";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  // 1. Acesso direto às variáveis corretas do Supabase exportadas no env.ts
  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "URL ou Anon Key do Supabase não configuradas no .env.local!"
    );
  }

  // 2. Criação do cliente Supabase SSR para atualização de cookies/sessão
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // 3. Atualiza os cookies da sessão Supabase no Middleware se necessário
  await supabase.auth.getUser();

  return response;
}

// Configuração opcional para evitar executar o middleware em arquivos estáticos (mídias, css, etc)
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};