"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { registerUserAction } from "@/actions/auth/register-user.action";

const registerSchema = z
  .object({
    name: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Insira um e-mail válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function useRegister() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setErrorMessage("");

    startTransition(async () => {
      const response = await registerUserAction({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (!response.success) {
        setErrorMessage(response.error);
        return;
      }

      // Redireciona para a rota raiz onde está a sua page.tsx do grupo (auth)
      router.push("/?registered=true");
    });
  });

  return {
    form,
    isPending,
    errorMessage,
    onSubmit,
  };
}