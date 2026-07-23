import Link from "next/link";
import { LoginCard } from "@/components/features/login/login-card";
import { LoginForm } from "@/components/features/login/login-form";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 bg-zinc-950 text-zinc-100 relative overflow-hidden">
      {/* Detalhe estético de fundo (Grid/Gradients opcionais) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950 -z-10" />

      <LoginCard
        title="Portal de Atendimento"
        description="Informe suas credenciais para acessar os chamados"
        footer={
          <p>
            Ainda não tem uma conta?{" "}
            <Link
              href="/register"
              className="text-blue-400 hover:underline font-medium"
            >
              Cadastre-se aqui
            </Link>
          </p>
        }
      >
        <LoginForm />
      </LoginCard>
    </main>
  );
}