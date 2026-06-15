import { useState } from "react";
import { useRouter } from "next/navigation";
import { criarTicketAction } from "@/modules/tickets/actions/CriarTicketAction";

export function useCriarTicketForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errosCampos, setErrosCampos] = useState<Record<string, string[]>>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);

  async function onSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrosCampos({});
    setErroGeral(null);

    const formData = new FormData(event.currentTarget);
    const resultado = await criarTicketAction(formData);

    if (!resultado.success) {
      setLoading(false);
      if (resultado.errors) {
        setErrosCampos(resultado.errors);
      } else if (resultado.message) {
        setErroGeral(resultado.message);
      }
      return;
    }

    router.push("/chamados");
    router.refresh();
  }

  return {
    loading,
    errosCampos,
    erroGeral,
    onSubmit,
    onCancel: () => router.back(),
  };
}