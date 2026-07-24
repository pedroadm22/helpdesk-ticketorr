// src/modules/auth/ui/login-form.tsx
"use client";

import { Mail, Lock } from "lucide-react";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormUnderlineInput } from "@/components/ui/form-underline-input";

import { useLogin } from "@/hooks/use-login";
import { LoginCard } from "@/components/features/login/login-card";
import { CloseButton } from "@/components/ui/close-button";
import { AuthOptions } from "@/components/features/login/auth-options";
import { RegisterFooter } from "@/components/features/login/register-footer";

export function LoginForm() {
  const { form, isPending, errorMessage, onSubmit } = useLogin();

  return (
    <LoginCard>
      <CloseButton />

      <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
        Login
      </h2>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          
          {/* Campo E-mail */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormUnderlineInput
                    {...field}
                    type="email"
                    placeholder="E-mail"
                    icon={Mail}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 mt-1" />
              </FormItem>
            )}
          />

          {/* Campo Senha */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormUnderlineInput
                    {...field}
                    type="password"
                    placeholder="Senha"
                    icon={Lock}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 mt-1" />
              </FormItem>
            )}
          />

          {/* Lembrar-me & Esqueceu a Senha */}
          <AuthOptions />

          {/* Mensagem de Erro da API */}
          <FormError message={errorMessage} />

          {/* Botão de Submit do shadcn */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-zinc-900 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg border border-emerald-500/30 hover:border-emerald-500 transition-all shadow-md"
          >
            {isPending ? "Autenticando..." : "Entrar"}
          </Button>

          {/* Link "Não tem uma conta?" */}
          <RegisterFooter />

        </form>
      </Form>
    </LoginCard>
  );
}