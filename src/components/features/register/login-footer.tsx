// src/components/features/auth/components/login-footer.tsx
import Link from "next/link";

export function LoginFooter() {
  return (
    <div className="text-center text-xs text-zinc-400 pt-2">
      Já possui uma conta?{" "}
      <Link
        href="/"
        className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
      >
        Entrar
      </Link>
    </div>
  );
}