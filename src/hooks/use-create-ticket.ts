"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTicketAction } from "@/actions/tickets/create-ticket.action";

const createTicketSchema = z.object({
  title: z.string().min(5, "O título deve ter no mínimo 5 caracteres"),
  description: z.string().min(10, "A descrição deve ter no mínimo 10 caracteres"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  departmentId: z.string().min(1, "Selecione um departamento"),
  serviceId: z.string().min(1, "Selecione um serviço"),
});

export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

export function useCreateTicket(onSuccess?: () => void) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");

  const form = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "MEDIUM",
      departmentId: "", // Passe um ID válido do seu banco para testar
      serviceId: "",    // Passe um ID válido do seu banco para testar
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    setErrorMessage("");

    startTransition(async () => {
      const response = await createTicketAction(values);

      if (!response.success) {
        setErrorMessage(response.error);
        return;
      }

      form.reset();
      if (onSuccess) onSuccess();
    });
  });

  return {
    form,
    isPending,
    errorMessage,
    onSubmit,
  };
}