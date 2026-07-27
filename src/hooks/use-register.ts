import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterInput } from "@/modules/auth/dto/register-user.dto";
import { registerAction } from "@/actions/register-user.action";

export function useRegister() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleSubmit(data: RegisterInput) {
    

    setIsPending(true);
    setErrorMessage(null);

    const result = await registerAction(data);

    if (!result.success) {
      setErrorMessage(result.error ?? "Ocorreu um erro ao cadastrar.");
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
    onSubmit: form.handleSubmit(handleSubmit),
  };
}