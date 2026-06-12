import { TicketInsert } from "@/infrastructure/schema/ticket";

// Pegamos apenas o que o cliente digita no front-end + o ID logado dele
export type CriarTicketDto = Pick<TicketInsert, "titulo" | "descricao" | "clienteId">;
