import { signIn } from "@/infrastructure/auth/auth-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface HandleLoginParams {
  email: string;
  password: string;
  router: AppRouterInstance;
  setIsPending: (pending: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export async function handleLoginSubmit({
  email,
  password,
  router,
  setIsPending,
  setErrorMessage,
}: HandleLoginParams) {
  setIsPending(true);
  setErrorMessage(null);

  await signIn.email(
    {
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
        setErrorMessage(
          ctx.error.message || "Credenciais inválidas. Tente novamente.",
        );
      },
    },
  );
}
