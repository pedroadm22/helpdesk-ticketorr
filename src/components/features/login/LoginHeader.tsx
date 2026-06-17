// src/modules/auth/components/LoginHeader.tsx
export function LoginHeader() {
  return (
    <div className="space-y-2 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/40 border border-blue-900/50 rounded-full text-blue-400 text-xs font-mono font-semibold tracking-wide">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        Ticketorr v1.0
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-100 mt-2">
        Acesse sua conta
      </h1>
      <p className="text-zinc-500 text-sm">
        Insira suas credenciais para gerenciar seus chamados
      </p>
    </div>
  );
}