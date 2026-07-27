"use client";

import { Mail, Lock } from "lucide-react";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/glass-card";
import { FormError } from "@/components/ui/form-error";
import { FormUnderlineInput } from "@/components/ui/form-underline-input";

import { useLogin } from "@/hooks/use-login";
import { CloseButton } from "@/components/ui/close-button";
import { AuthOptions } from "./auth-options";
import { AuthFooter } from "@/components/ui/auth-footer";

export function LoginForm() {
  const { form, isPending, errorMessage, onSubmit } = useLogin();

  return (
    <Card>
      <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
        Login
      </h2>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-6">
          
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

          <AuthOptions />

          <FormError message={errorMessage} />

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-zinc-900 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg border border-emerald-500/30 hover:border-emerald-500 transition-all shadow-md"
          >
            {isPending ? "Autenticando..." : "Entrar"}
          </Button>

          {/* Rodapé genérico reutilizado */}
          <AuthFooter
            text="Não tem uma conta?"
            linkText="Cadastre-se"
            href="/register"
          />

        </form>
      </Form>
    </Card>
  );
}