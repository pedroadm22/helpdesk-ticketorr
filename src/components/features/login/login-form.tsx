"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/ui/form-input";
import { FormError } from "@/components/ui/form-error";

import { loginSchema, LoginInputDto } from "@/modules/auth/dto/login-submit.dto";
import { authClient } from '@/infrastructure/auth/auth-client';

export function LoginForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<LoginInputDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginInputDto) {
    setIsPending(true);
    setErrorMessage(null);

    try {
      const { data: resData, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error) {
        setErrorMessage(error.message || "E-mail ou senha incorretos.");
        setIsPending(false);
        return;
      }

      if (resData) {
        router.refresh();
        router.push("/dashboard");
      }
    } catch {
      setErrorMessage("Erro ao conectar com o servidor.");
      setIsPending(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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