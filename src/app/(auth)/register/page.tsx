import { RegisterForm } from "@/components/features/register/register-form";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen w-full bg-zinc-950 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Luz Neon de Fundo */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />

      <section className="relative z-10 w-full max-w-md">
        <RegisterForm />
      </section>

    </main>
  );
}