import { defineRelations } from "drizzle-orm";
import { departments } from "./departments";
import { services } from "./services";
import { tickets } from "./tickets";
import { ticketMessages } from "./ticket-messages";

export const relations = defineRelations(
  {
    users,
    sessions,
    accounts,
    departments,
    services,
    tickets,
    ticketMessages,
  },
  (r) => ({
    // 1. Usuário (better-auth + Regras de Negócio)
    user: {
      sessions: r.many.sessions({
        from: r.users.id,
        to: r.sessions.userId,
      }),
      accounts: r.many.accounts({
        from: r.users.id,
        to: r.accounts.userId,
      }),
      department: r.one.departments({
        from: r.users.departmentId,
        to: r.departments.id,
      }),
      ticketsAsClient: r.many.tickets({
        from: r.users.id,
        to: r.tickets.clientId,
      }),
      ticketsAsAgent: r.many.tickets({
        from: r.users.id,
        to: r.tickets.assignedAgentId,
      }),
      messages: r.many.ticketMessages({
        from: r.users.id,
        to: r.ticketMessages.senderId,
      }),
    },

    // 2. Sessões do better-auth
    sessions: {
      user: r.one.users({
        from: r.sessions.userId,
        to: r.users.id,
      }),
    },

    // 3. Contas/Provedores do better-auth
    account: {
      user: r.one.users({
        from: r.accounts.userId,
        to: r.users.id,
      }),
    },

    // 4. Departamentos
    departments: {
      services: r.many.services({
        from: r.departments.id,
        to: r.services.departmentId,
      }),
      tickets: r.many.tickets({
        from: r.departments.id,
        to: r.tickets.departmentId,
      }),
      agents: r.many.users({
        from: r.departments.id,
        to: r.users.departmentId,
      }),
    },

    // 5. Serviços
    services: {
      department: r.one.departments({
        from: r.services.departmentId,
        to: r.departments.id,
      }),
      tickets: r.many.tickets({
        from: r.services.id,
        to: r.tickets.serviceId,
      }),
    },

    // 6. Chamados / Tickets
    tickets: {
      client: r.one.users({
        from: r.tickets.clientId,
        to: r.users.id,
      }),
      assignedAgent: r.one.users({
        from: r.tickets.assignedAgentId,
        to: r.users.id,
      }),
      department: r.one.departments({
        from: r.tickets.departmentId,
        to: r.departments.id,
      }),
      service: r.one.services({
        from: r.tickets.serviceId,
        to: r.services.id,
      }),
      messages: r.many.ticketMessages({
        from: r.tickets.id,
        to: r.ticketMessages.ticketId,
      }),
    },

    // 7. Mensagens do Chamado
    ticketMessages: {
      ticket: r.one.tickets({
        from: r.ticketMessages.ticketId,
        to: r.tickets.id,
      }),
      sender: r.one.users({
        from: r.ticketMessages.senderId,
        to: r.users.id,
      }),
    },
  }),
);
