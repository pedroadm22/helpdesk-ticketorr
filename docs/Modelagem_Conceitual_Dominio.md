# MODELAGEM CONCEITUAL DO DOMÍNIO E REGRAS DE NEGÓCIO
**Projeto:** Sistema de Atendimento e Helpdesk (Deskflow / ResolvTI)  
**Data:** 05/08/2026  
**Versão:** 1.0  

---

## 1. DICIONÁRIO DO DOMÍNIO (LINGUAGEM UBÍQUA)

* **User (Usuário):** Ator cadastrado no sistema. Classificado em três papéis (*Roles*):
  * `CLIENT`: Solicitante que abre e acompanha seus chamados.
  * `AGENT`: Técnico responsável pelo atendimento dos chamados que lhe forem expressamente atribuídos.
  * `ADMIN`: Administrador geral que gerencia o catálogo base (departamentos, serviços e usuários) e faz a distribuição de chamados.
* **Department (Departamento):** Setor organizacional da empresa (ex: *TI, Infraestrutura, Recursos Humanos*).
* **Service (Serviço):** Item do catálogo oferecido por um departamento (ex: *Reset de Senha, Troca de Tonner*).
* **Ticket (Chamado):** Registro individual de uma solicitação de atendimento.
* **TicketComment (Interação / Thread):** Mensagem assíncrona registrada na linha do tempo de um chamado.

---

## 2. ENTIDADES E ATRIBUTOS DO DOMÍNIO

### Módulo: Catalog (Catálogo Base)

#### 🏢 Entidade: `Department`
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | Identificador Único | Chave primária |
| `name` | Texto | Nome do departamento (ex: "Suporte TI") |
| `description` | Texto (Opcional) | Descrição do escopo do setor |
| `isActive` | Booleano | Status de disponibilidade do departamento |
| `createdAt` | Data/Hora | Registro do momento de criação |
| `updatedAt` | Data/Hora | Registro da última alteração |

#### 🛠️ Entidade: `Service`
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | Identificador Único | Chave primária |
| `departmentId` | Identificador Único | Vínculo com o departamento responsável |
| `name` | Texto | Nome do serviço (ex: "Instalação de Software") |
| `description` | Texto | Orientações sobre o escopo do serviço |
| `slaHours` | Inteiro | Tempo limite padrão em horas para solução |
| `defaultPriority` | Enum | Prioridade padrão (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) |
| `isActive` | Booleano | Status de disponibilidade no catálogo |
| `createdAt` | Data/Hora | Registro do momento de criação |
| `updatedAt` | Data/Hora | Registro da última alteração |

#### 👤 Entidade: `User`
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | Identificador Único | Chave primária |
| `name` | Texto | Nome completo do usuário |
| `email` | Texto (Único) | E-mail de acesso e identificação |
| `role` | Enum | Papel no sistema (`CLIENT`, `AGENT`, `ADMIN`) |
| `departmentId` | Identificador Único | Vínculo de departamento (obrigatório para `AGENT`) |
| `avatarUrl` | Texto (Opcional) | Link da imagem de perfil |
| `createdAt` | Data/Hora | Registro de cadastro |
| `updatedAt` | Data/Hora | Registro da última alteração |

---

### Módulo: Tickets (Gestão de Chamados)

#### 🎫 Entidade: `Ticket`
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | Identificador Único | Chave primária interna |
| `code` | Texto (Único) | Identificador sequencial público (ex: `#INC-1001`) |
| `title` | Texto | Resumo do problema |
| `description` | Texto | Detalhamento da necessidade do cliente |
| `status` | Enum | Estado do ciclo de vida do chamado |
| `priority` | Enum | Nível de urgência (`LOW`, `MEDIUM`, `HIGH`, `URGENT`) |
| `clientId` | Identificador Único | Vínculo com o solicitante (`User` com `role = CLIENT`) |
| `assignedToId` | Identificador Único | Vínculo com o agente (`User` com `role = AGENT`/`ADMIN`) |
| `departmentId` | Identificador Único | Vínculo com o departamento |
| `serviceId` | Identificador Único | Vínculo com o serviço do catálogo |
| `dueDate` | Data/Hora | Prazo limite de resolução (Calculado via SLA) |
| `resolvedAt` | Data/Hora | Momento de conclusão do atendimento |
| `createdAt` | Data/Hora | Data/Hora de abertura do chamado |
| `updatedAt` | Data/Hora | Data/Hora da última movimentação |

#### 💬 Entidade: `TicketComment`
| Atributo | Tipo | Descrição |
| :--- | :--- | :--- |
| `id` | Identificador Único | Chave primária |
| `ticketId` | Identificador Único | Vínculo com o chamado |
| `authorId` | Identificador Único | Vínculo com o autor da mensagem |
| `content` | Texto | Conteúdo textual da interação assíncrona |
| `isInternal` | Booleano | Sinalizador de nota técnica (`true` = Privado) |
| `createdAt` | Data/Hora | Registro do envio da mensagem |

---

## 3. REGRAS INVARIANTES DO DOMÍNIO (REGRAS IMUTÁVEIS)

1. **Invariante de Validação de Serviço e Departamento Ativo:**
   Um `Ticket` só pode ser aberto se o `Service` e o `Department` vinculados estiverem ambos com `isActive = true`.
2. **Invariante de Imutabilidade do Prazo de SLA (`dueDate`):**
   A data limite de solução é calculada exclusivamente no momento da criação do chamado:
   $$\text{dueDate} = \text{createdAt} + \text{service.slaHours}$$
   O campo `dueDate` é imutável e não pode ser redefinido manualmente.
3. **Invariante de Atribuição Válida:**
   Um `Ticket` só pode ser atribuído a um `User` que possua o papel `AGENT` ou `ADMIN` **E** que pertença ao mesmo departamento do chamado.
4. **Invariante de Isolamento da Fila do Agente (RF-03.2):**
   Usuários com papel `AGENT` têm permissão de leitura e edição **exclusivamente** em chamados onde `assignedToId == agent.id`. Chamados não atribuídos a ele permanecem invisíveis na sua fila individual.
5. **Invariante de Proteção de Notas Internas:**
   Comentários marcados com `isInternal = true` só podem ser criados por `AGENT` ou `ADMIN` e **jamais** podem ser expostos em consultas realizadas por um `CLIENT`.
6. **Invariante de Preservação de Histórico e Exclusão Lógica:**
   Registros de `Department` e `Service` vinculados a chamados não podem ser excluídos fisicamente, devendo utilizar exclusão lógica (`isActive = false`). Exclusões físicas de `Ticket` e `TicketComment` são proibidas.

---

## 4. MAPEAMENTO DE CARDINALIDADES

```text
[ Department ] 1 ────────── N [ Service ]
      │ 1                        │ 1
      │                          │
      │ N                        │ N
   [ User ] 1 ────────────────► [ Ticket ] 1 ────────── N [ TicketComment ]
 (Client/Agent) (Solicitante ou     │
                  Atribuído)        ├── 1 ──► [ Department ]
                                    └── 1 ──► [ Service ]