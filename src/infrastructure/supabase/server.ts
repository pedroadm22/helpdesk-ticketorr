// src/infrastructure/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "@/config/env";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    env.supabase.url!,
    env.supabase.anonKey!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // O método setAll foi chamado de um Server Component.
            // Isso pode ser ignorado se você tiver o middleware atualizando as sessões dos usuários.
          }
        },
      },
    }
  );
}