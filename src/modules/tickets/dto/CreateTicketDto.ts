import { createInsertSchema } from "drizzle-zod";
import { tickets } from "@/infrastructure/db/schema/tickets";
import { z } from "zod";

export const createTicketSchema = createInsertSchema(tickets, {
  title: (schema) => schema.min(5, { 
    message: "O título do chamado deve ter pelo menos 5 caracteres." 
  }),
  description: (schema) => schema.min(10, { 
    message: "Descreva o problema com pelo menos 10 caracteres para ajudar no suporte." 
  }),
  departmentId: (schema) => schema.min(1, { 
    message: "Selecione o departamento responsável." 
  }),
  serviceId: (schema) => schema.min(1, { 
    message: "Selecione o serviço desejado." 
  }),
  // O clientId é injetado pelo servidor (através da sessão de login) por segurança
  clientId: (schema) => schema.min(1, {
    message: "ID do cliente é obrigatório."
  }),
}).omit({
  id: true,             // Gerado via UUID no Use Case
  statusId: true,       // Inicia com o status padrão (Ex: "awaiting-triage")
  priorityId: true,     // Definido por triagem ou triado posteriormente
  technicianId: true,   // Inicia sem técnico atribuído
  createdAt: true,
  updatedAt: true,
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;