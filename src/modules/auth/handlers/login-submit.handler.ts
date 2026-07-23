import { loginAction } from "@/actions/auth/login.action";
import { LoginInputDto } from "@/modules/auth/dto/login-submit.dto";

interface HandleLoginParams {
  data: LoginInputDto;
  router: any;
  setIsPending: (pending: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export async function handleLoginSubmit({
  data,
  router,
  setIsPending,
  setErrorMessage,
}: HandleLoginParams) {
  setIsPending(true);
  setErrorMessage(null);

  try {
    const response = await loginAction(data);

    if (!response.success) {
      setErrorMessage(response.error || "Erro ao efetuar o login.");
      setIsPending(false);
      return;
    }

    // Sucesso: Redireciona e atualiza os dados da sessão na tela
    router.push("/dashboard");
    router.refresh();
  } catch (error) {
    setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
    setIsPending(false);
  }
}