import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. O Better Auth salva o token da sessão em um cookie com esse nome padrão
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  // 2. Proteção das rotas do Painel (/dashboard)
  if (url.pathname.startsWith("/dashboard")) {
    // Se o usuário não tiver o token de sessão, barra o acesso e joga para o login
    if (!sessionToken) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 3. Se o usuário já estiver logado e tentar acessar as telas de login/cadastro,
  // nós jogamos ele direto para dentro do painel
  if ((url.pathname === "/login" || url.pathname === "/cadastro") && sessionToken) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configura em quais caminhos o middleware do Next.js deve ser ativado
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/login", 
    "/cadastro"
  ],
};