## 📐 Mapeamento de Relacionamentos do Sistema

### 1. Estrutura de Entidades (Visão Geral)

* 🏢 **Department** (Departamento)
  ├── 🛠️ **Service** (Serviços do catálogo oferecidos pelo departamento)
  └── 👤 **User** (Agentes/Técnicos alocados no departamento)

* 👤 **User** (Usuário)
  ├── 🔑 **UserSession** (Sessões ativas do usuário)
  ├── 🎫 **Ticket [Cliente]** (Chamados abertos pelo usuário)
  ├── 🎫 **Ticket [Agente]** (Chamados atribuídos ao técnico)
  └── 💬 **TicketComment** (Comentários e notas do usuário)

* 🛠️ **Service** (Serviço)
  └── 🎫 **Ticket** (Chamados categorizados neste serviço)

* 🎫 **Ticket** (Chamado)
  └── 💬 **TicketComment** (Histórico de comentários e interações)

---

### 2. Tabela de Relacionamentos (Drizzle ORM / Banco de Dados)

| Entidade Origem | Entidade Destino | Chave Estrangeira (`FK`) | Cardinalidade | Regra de Deleção (`onDelete`) |
| :--- | :--- | :--- | :---: | :--- |
| **Department** | `Service` | `services.department_id` | 1 : N | `CASCADE` (Exclusão lógica via `active: false`) |
| **Department** | `User` | `users.department_id` | 1 : N | `SET NULL` (Se desativar depto, limpa o agente) |
| **User** | `UserSession` | `user_sessions.user_id` | 1 : N | `CASCADE` |
| **User (Cliente)**| `Ticket` | `tickets.client_id` | 1 : N | `RESTRICT` (Impede apagar cliente com histórico) |
| **User (Agente)** | `Ticket` | `tickets.assigned_agent_id` | 1 : N | `SET NULL` (Permite reatribuir o chamado) |
| **Service** | `Ticket` | `tickets.service_id` | 1 : N | `RESTRICT` (Impede apagar serviço com histórico) |
| **Ticket** | `TicketComment` | `ticket_comments.ticket_id` | 1 : N | `CASCADE` |
| **User (Autor)** | `TicketComment` | `ticket_comments.user_id` | 1 : N | `RESTRICT` |

---

### 3. Mapeamento de Enumerados (Enums)

* **`user_role`**: `CLIENT` | `AGENT` | `ADMIN`
* **`ticket_status`**: `OPEN` | `WAITING_AGENT` | `VIEWED` | `WAITING_CLIENT` | `RESOLVED` | `CLOSED`
* **`ticket_priority`**: `LOW` | `MEDIUM` | `HIGH` | `URGENT`