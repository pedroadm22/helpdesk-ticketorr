// src/modules/auth/hooks/useLoginForm.ts
"use client";

import { useState } from "react";

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLoginSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setCarregando(true);

    try {
      // Simulação da chamada de autenticação por enquanto
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Tentativa de login com:", { email, senha });
    } catch (error) {
      console.error("Erro ao autenticar:", error);
    } finally {
      setCarregando(false);
    }
  };

  return {
    email,
    setEmail,
    senha,
    setSenha,
    carregando,
    handleLoginSubmit,
  };
}