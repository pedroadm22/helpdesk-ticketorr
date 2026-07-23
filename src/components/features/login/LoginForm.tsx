"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleLoginSubmit } from "@/modules/auth/handlers/login-submit.handler"; // Ajuste o caminho do import se necessário
import { Button } from "@/components/ui/button";
import { LoginInput } from './LoginInput';

export function LoginForm() {
  const router = useRouter();
  
  // Estados locais gerenciados pelo handler
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Dispara o handler reutilizável
    await handleLoginSubmit({
      data: { email, password },
      router,
      setIsPending,
      setErrorMessage,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LoginInput
        id="email"
        name="email"
        label="E-mail"
        type="email"
        placeholder="seu@email.com"
        disabled={isPending}
        required
      />

      <LoginInput
        id="password"
        name="password"
        label="Senha"
        type="password"
        placeholder="••••••••"
        disabled={isPending}
        required
      />

      {errorMessage && (
        <div className="rounded-md bg-red-500/10 p-3 border border-red-500/20">
          <p className="text-xs text-red-400 font-medium">{errorMessage}</p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
      >
        {isPending ? "Autenticando..." : "Entrar"}
      </Button>
    </form>
  );
}