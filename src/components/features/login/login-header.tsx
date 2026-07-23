import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function LoginHeader() {
  return (
    <CardHeader className="space-y-1 text-center">
      <CardTitle className="text-2xl font-bold tracking-tight text-zinc-100">
        Acessar a Plataforma
      </CardTitle>
      <CardDescription className="text-zinc-400">
        Digite suas credenciais para entrar na sua conta
      </CardDescription>
    </CardHeader>
  );
}