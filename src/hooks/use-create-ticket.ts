// src/components/features/tickets/hooks/use-create-ticket-form.ts
import { useState, useTransition, useMemo } from "react";
import { createTicketAction } from "@/actions/tickets/create-ticket.action";

export interface ServiceOption {
  id: string;
  name: string;
  departmentId: string;
  departmentName?: string;
}

interface UseCreateTicketFormProps {
  servicesList: ServiceOption[];
  onSuccess?: () => void;
}

export function useCreateTicket({
  servicesList,
  onSuccess,
}: UseCreateTicketFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");

  const selectedService = useMemo(() => {
    return servicesList.find((srv) => String(srv.id) === String(serviceId));
  }, [servicesList, serviceId]);

  function resetForm() {
    setServiceId("");
    setDescription("");
    setErrorMessage(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedService) {
      setErrorMessage("Por favor, selecione um serviço válido.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Por favor, descreva o problema com mais detalhes.");
      return;
    }

    startTransition(async () => {
      const res = await createTicketAction({
        serviceId,
        departmentId: selectedService.departmentId, // 👈 Enviando o departmentId extraído do serviço
        description,
      });

      if (res.success) {
        resetForm();
        if (onSuccess) onSuccess();
      } else {
        if (Array.isArray(res.error)) {
          setErrorMessage(
            res.error[0]?.message || "Erro de validação nos dados.",
          );
        } else {
          setErrorMessage(res.error || "Erro inesperado.");
        }
      }
    });
  }

  return {
    formState: {
      serviceId,
      description,
      selectedService,
      errorMessage,
      isPending,
    },
    formActions: {
      setServiceId: (val: string | null) => setServiceId(val ?? ""),
      setDescription,
      handleSubmit,
      resetForm,
    },
  };
}
