## 01. Visão Geral e Arquitetura do Sistema

### 🎯 Sobre o Projeto
O **ResolvTI** é um sistema de Atendimento e Helpdesk projetado para alta escalabilidade, manutenibilidade e isolamento de regras de negócio.

### 🛠️ Tech Stack
- **Framework Fullstack:** Next.js (App Router)
- **Linguagem:** TypeScript
- **ORM:** Drizzle ORM
- **Banco de Dados:** PostgreSQL
- **Arquitetura:** Clean Architecture + Domain-Driven Design (DDD)

### 🏛️ Estrutura de Pastas e Módulos

```text
src/
├── app/                        # [Presentation / Infra] Next.js App Router (Pages, API Routes, Actions)
│   ├── (auth)/                 # Interface e fluxos de login/sessão
│   ├── (dashboard)/            # Interface do Cliente, Agente e Admin
│   ├── actions/                # Server Actions que invocam os Use-Cases
│   └── api/                    # Webhooks e Route Handlers REST
│
├── core/                       # [Core Domain & Application] Regras puras em TypeScript (Sem frameworks)
│   ├── domain/                 # Entidades, Enums, State Machine e Erros de Domínio
│   │   ├── entities/           # Ticket, User, Department, Service, TicketComment, UserSession
│   │   ├── enums/              # user-role, ticket-status, ticket-priority
│   │   ├── errors/             # Exceções customizadas de negócio
│   │   └── services/           # Services de domínio (ex: TicketStateMachine)
│   │
│   └── use-cases/              # Casos de Uso da Aplicação (CreateTicket, AssignTicket, etc.)
│
└── infra/                      # [Infrastructure] Persistência, ORM e Serviços Externos
    ├── db/
    │   ├── drizzle/
    │   │   └── schema/         # Schemas do Drizzle colocalizados por entidade
    │   └── client.ts           # Instância de conexão PostgreSQL
    └── repositories/           # Implementações concretas dos repositórios
```

---