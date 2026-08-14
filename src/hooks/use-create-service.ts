// src/components/features/catalog/hooks/use-create-service-form.ts
import { useState, useTransition } from "react";
import { createServiceAction } from "@/actions/services/create-service.action";

interface UseCreateServiceFormProps {
  onSuccess?: () => void;
}

export function useCreateServiceForm({ onSuccess }: UseCreateServiceFormProps = {}) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  function resetForm() {
    setName("");
    setDepartmentId("");
    setDescription("");
    setErrorMessage(null);
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    // Validação local prévia do UUID do departamento
    if (!departmentId || departmentId.trim() === "") {
      setErrorMessage("Selecione um departamento válido antes de salvar.");
      return;
    }

    startTransition(async () => {
      const res = await createServiceAction({
        name,
        departmentId,
        description,
      });

      if (res.success) {
        resetForm();
        if (onSuccess) onSuccess();
      } else {
        // Trata caso retorne array de erros do Zod ou string
        if (Array.isArray(res.error)) {
          setErrorMessage(res.error[0]?.message || "Erro de validação nos dados.");
        } else {
          setErrorMessage(res.error || "Erro inesperado.");
        }
      }
    });
  }

  return {
    formState: {
      name,
      departmentId,
      description,
      errorMessage,
      isPending,
    },
    formActions: {
      setName,
      setDepartmentId,
      setDescription,
      handleSubmit,
      resetForm,
    },
  };
}