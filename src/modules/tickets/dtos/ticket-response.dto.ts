import { Ticket, Department, Service, User } from "@/shared/types/domain/db.type";

// 🛡️ Usuário público seguro para exibição visual no frontend (sem dados sensíveis)
export type PublicUserDTO = Pick<
  User,
  "id" | "name" | "email" | "image" | "role"
>;

// 🎯 Resposta unificada do Ticket com todas as suas relações populadas
export type TicketResponseDTO = Ticket & {
  department: Pick<Department, "id" | "name">;
  service: Pick<Service, "id" | "name" | "servicePriority">; // 🟢 Novo: Serviço vinculado
  client: PublicUserDTO;
  assignedTo: PublicUserDTO | null;
};