"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginInput } from "./LoginInput";
import { handleLoginSubmit } from "@/modules/auth/handlers/login-submit.handler";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginSubmit({
      email,
      password,
      router,
      setIsPending,
      setErrorMessage,
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {errorMessage && (
        <div className="p-3 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
          {errorMessage}
        </div>
      )}

      <LoginInput
        id="email"
        name="email"
        type="email"
        label="E-mail"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isPending}
      />

      <LoginInput
        id="password"
        name="password"
        type="password"
        label="Senha"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isPending}
        rightElement={
          <a
            href="/forgot-password"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
          >
            Esqueceu a senha?
          </a>
        }
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 px-4 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Autenticando..." : "Entrar no Sistema"}
      </button>
    </form>
  );
}