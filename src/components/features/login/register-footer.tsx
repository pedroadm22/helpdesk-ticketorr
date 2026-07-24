// src/modules/auth/ui/components/register-footer.tsx
import Link from "next/link";

export function RegisterFooter() {
  return (
    <div className="text-center text-xs text-zinc-400 pt-2">
      Não tem uma conta?{" "}
      <Link
        href="/cadastro"
        className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 transition-colors"
      >
        Cadastre-se
      </Link>
    </div>
  );
}