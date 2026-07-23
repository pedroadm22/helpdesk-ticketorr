import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Defina suas rotas públicas
  const isPublicRoute = pathname === "/" || pathname === "/cadastro";

  // 2. Consulta a sessão na API interna do Better Auth
  const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  if (!sessionResponse.ok) {
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  const sessionData = await sessionResponse.json();
  const hasSession = sessionData && (sessionData.session || sessionData.user);

  // 3. Redirecionamentos
  if (hasSession && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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