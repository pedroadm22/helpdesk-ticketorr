"use client";

import { User, Mail, Lock } from "lucide-react";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormUnderlineInput } from "@/components/ui/form-underline-input";

import { useRegister } from "@/hooks/use-register";
import { GlassCard } from "@/components/ui/glass-card";
import { CloseButton } from "@/components/ui/close-button";
import { LoginFooter } from "./login-footer";

export function RegisterForm() {
  const { form, isPending, errorMessage, onSubmit } = useRegister();

  return (
    <GlassCard>
      <CloseButton />

      <h2 className="text-3xl font-bold text-center mb-8 text-white tracking-wide">
        Criar Conta
      </h2>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-5">
          
          {/* Campo Nome */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormUnderlineInput
                    {...field}
                    type="text"
                    placeholder="Nome Completo"
                    icon={User}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 mt-1" />
              </FormItem>
            )}
          />

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

          {/* Confirmar Senha */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FormUnderlineInput
                    {...field}
                    type="password"
                    placeholder="Confirmar Senha"
                    icon={Lock}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400 mt-1" />
              </FormItem>
            )}
          />

          {/* Alerta de erro vindo do servidor */}
          <FormError message={errorMessage} />

          {/* Botão de Envio */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-emerald-950/40 mt-2"
          >
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </Button>

          {/* Link para voltar ao Login */}
          <LoginFooter />

        </form>
      </Form>
    </GlassCard>
  );
}