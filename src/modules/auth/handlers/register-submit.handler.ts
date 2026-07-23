import { signUp } from "@/infrastructure/auth/auth-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface HandleRegisterParams {
  name: string;
  email: string;
  password: string;
  router: AppRouterInstance;
  setIsPending: (pending: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export async function handleRegisterSubmit({
  name,
  email,
  password,
  router,
  setIsPending,
  setErrorMessage,
}: HandleRegisterParams) {
  setIsPending(true);
  setErrorMessage(null);

  await signUp.email(
    {
      name,
      email,
      password,
    },
    {
      onSuccess: () => {
        router.push("/dashboard");
        router.refresh();
      },
      onError: (ctx) => {
        setIsPending(false);
        setErrorMessage(ctx.error.message || "Erro ao criar conta.");
      },
    }
  );
}