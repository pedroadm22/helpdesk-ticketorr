"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/infrastructure/auth-client";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);

    console.log("🚀 Enviando credenciais para o servidor:", email);

    try {
      const { data, error } = await authClient.signIn.email({
        email: email,
        password: senha,
        fetchOptions: {
          redirect: "manual",
        }, // Avisa que nós controlaremos o redirecionamento via JS
      });

      console.log("📥 Resposta recebida do Better Auth:", { data, error });

      if (error) {
        setErro(error.message || "E-mail ou senha incorretos.");
        setCarregando(false);
        return;
      }

      if (data) {
        console.log("🎉 Login efetuado! Redirecionando para o painel...");
        router.push("/dashboard");
        router.refresh(); // Limpa caches do Next.js para carregar a sessão nova
      }
    } catch (err) {
      console.error("💥 Erro inesperado na requisição:", err);
      setErro("Não foi possível conectar ao servidor de autenticação.");
      setCarregando(false);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    erro,
    handleLoginSubmit,
  };
}
