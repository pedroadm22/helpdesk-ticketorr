import { LoginForm } from "@/components/features/login/login-form";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
      
      {/* 🟢 Luz Neon de Fundo (Glow Verde sutil) */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      {/* Apenas o Card de Login Centralizado */}
      <section className="relative z-10 w-full max-w-md">
        <LoginForm />
      </section>

    </main>
  );
}