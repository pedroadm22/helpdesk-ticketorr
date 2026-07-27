import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { loginSchema, LoginInputDto } from "@/modules/auth/dto/login-submit.dto";
import { loginAction } from "@/actions/auth-login/login.action";

export function useLogin() {
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

  async function handleSubmit(data: LoginInputDto) {

    

    setIsPending(true);
    setErrorMessage(null);

    const result = await loginAction(data);

    if (!result.success) {
      setErrorMessage(result.error ?? "Ocorreu um erro ao fazer login.");
      setIsPending(false);
      return;
    }

    router.refresh();
    router.push("/dashboard");
  }

  return {
    form,
    isPending,
    errorMessage,
    // Adicionamos o segundo argumento para capturar falhas do schema no console
    onSubmit: form.handleSubmit(
      handleSubmit,
      (errors) => console.log("⚠️ Erros de validação do Zod:", errors)
    ),
  };
}