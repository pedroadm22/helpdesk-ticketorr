import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // 1. O Better Auth salva o token da sessão em um cookie com esse nome padrão
  const sessionToken = request.cookies.get("better-auth.session_token")?.value;

  // 2. Proteção das rotas do Painel (/dashboard)
  if (url.pathname.startsWith("/dashboard")) {
    // Se o usuário não tiver o token de sessão, barra o acesso e joga para o 
    if (!sessionToken) {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  if ((url.pathname === "/" || url.pathname === "/cadastro") && sessionToken) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configura em quais caminhos o middleware do Next.js deve ser ativado
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/", 
    "/cadastro"
  ],
};