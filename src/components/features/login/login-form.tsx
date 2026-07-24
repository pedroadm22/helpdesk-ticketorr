"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormError } from "@/components/ui/form-error";

import { useLogin } from "@/hooks/use-login";

export function LoginForm() {
  const { form, isPending, errorMessage, onSubmit } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          control={form.control}
          name="email"
          label="E-mail"
          type="email"
          placeholder="seu@email.com"
          disabled={isPending}
        />

        <FormInput
          control={form.control}
          name="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          disabled={isPending}
        />

        <FormError message={errorMessage} />

        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition-colors"
        >
          {isPending ? "Autenticando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}