// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Definir suas rotas públicas
  const isPublicRoute = pathname === "/" || pathname === "/cadastro";

  // 2. Buscar a sessão na API do Better Auth
  const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  // 🌟 O PULO DO GATO: Se a requisição falhar na rede, tratamos como deslogado
  if (!sessionResponse.ok) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const sessionData = await sessionResponse.json();

  // 🌟 CORRIGIDO: O Better Auth costuma retornar o usuário dentro de 'sessionData.session'.
  // Se 'sessionData' for nulo, ou não tiver a propriedade 'session', o usuário NÃO está autenticado.
  const hasSession = sessionData && (sessionData.session || sessionData.user);

  // 3. Lógica de Redirecionamento Baseada na Sessão Real
  
  // Se o usuário JÁ está logado e tenta ir para o Login (/) ou Cadastro, manda pro Dashboard
  if (hasSession && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Se o usuário NÃO está logado e tenta acessar uma rota privada (qualquer outra), manda pro Login (/)
  if (!hasSession && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};