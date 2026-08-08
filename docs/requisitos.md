# 📋 Documento de Requisitos (Funcionais e Não Funcionais) — ResolvTI

---

## 📌 1. Visão Geral
Este documento formaliza as capacidades funcionais e as restrições arquiteturais/técnicas do sistema ** ResolvTI**. Ele serve como especificação de software para o desenvolvimento dos Casos de Uso (*Use Cases*) e Testes de Integração.

---

## ⚙️ 2. Requisitos Funcionais (RF)

### 🎫 Módulo 1: Gestão de Chamados (Tickets)

* **RF-01: Abertura de Chamados (`CLIENT`)**
  * O sistema deve permitir que o cliente abra um novo chamado informando **Título**, **Descrição**, **Departamento** e **Serviço**.
  * Se o serviço selecionado possuir a flag `isFallback: true` (ex: "Outros / Suporte Geral"), o campo `customCategory` passa a ser de preenchimento **obrigatório**.
  * Apenas departamentos e serviços ativos (`active: true`) devem estar disponíveis para seleção.
  * O sistema deve calcular e gravar de forma imutável o prazo do SLA (`slaDueDate`) no momento da criação, baseado na regra: $\text{createdAt} + \text{service.slaHours}$.
  * O chamado recém-criado assume o status inicial **`OPEN`** e gera um código de identificação único legível (ex: `TK-2026-0001`).

* **RF-02: Acompanhamento e Interação (`CLIENT`)**
  * O cliente deve ser capaz de listar seus próprios chamados e visualizar o histórico de mensagens/comentários.
  * O cliente pode enviar mensagens para fornecer informações adicionais. Quando o cliente responde a um chamado em status **`WAITING_CLIENT`**, o status do chamado deve transitar automaticamente para **`WAITING_AGENT`**.
  * O cliente pode aceitar a solução dada e encerrar o chamado (transição de **`RESOLVED`** para **`CLOSED`**) ou reabri-lo (transição de **`RESOLVED`** para **`WAITING_AGENT`**).

* **RF-03: Atendimento e Triagem (`AGENT` e `ADMIN`)**
  * **Atribuição:** O `ADMIN` pode atribuir ou reatribuir chamados não atribuídos (`OPEN`) para qualquer técnico (`AGENT`) pertencente ao mesmo departamento do serviço do chamado. A atribuição altera o status para **`WAITING_AGENT`**.
  * **Leitura Automática:** Quando o agente atribuído abre os detalhes do chamado em status **`WAITING_AGENT`**, o sistema deve transitar o status automaticamente para **`VIEWED`**.
  * **Resposta ao Cliente:** O agente pode responder publicamente ao cliente, alterando o status para **`WAITING_CLIENT`**.
  * **Notas Internas (Privacidade):** Agentes e Admins podem inserir comentários marcados como `isInternal: true`. Essas notas são visíveis apenas para a equipe de atendimento/gestão e **nunca** para o cliente.
  * **Isolamento de Visibilidade (`AGENT`):** O agente (`AGENT`) tem permissão de visualização e edição restrita estritamente aos chamados atribuídos ao seu ID (`assignedAgentId == agent.id`).
  * **Resolução:** Agente ou Admin podem marcar o chamado como **`RESOLVED`**, informando a data/hora da solução (`resolvedAt`).

---

### 📂 Módulo 2: Gestão do Catálogo e Cadastros (`ADMIN`)

* **RF-04: Gerenciamento de Usuários**
  * O `ADMIN` pode criar, listar, atualizar dados (nome, email, cargo, departamento) e desativar usuários.
  * **Exclusão Lógica (Soft Delete):** A exclusão física de usuários é proibida. Desativar um usuário altera a flag `active` para `false`, impedindo novos logins sem apagar o histórico de chamados e comentários associados.

* **RF-05: Gerenciamento de Departamentos**
  * O `ADMIN` pode criar, atualizar e desativar departamentos.
  * Um departamento desativado (`active: false`) oculta seus serviços para aberturas de novos chamados por clientes, mantendo o histórico de chamados legível.

* **RF-06: Gerenciamento de Serviços**
  * O `ADMIN` pode cadastrar e editar serviços dentro de um departamento, definindo o tempo estimado de SLA (`slaHours`) e se o serviço é a categoria padrão/geral (`isFallback`).
  * Serviços também utilizam exclusão lógica (`active: false`).

---

### 📊 Módulo 3: Painel Geral e Métricas (`AGENT` e `ADMIN`)

* **RF-07: Dashboard Operacional**
  * O sistema deve possuir uma aba/visão de Dashboard cujo acesso é restrito exclusivamente aos perfis **`AGENT`** e **`ADMIN`** (bloqueado para `CLIENT`).
  * **Visão do Agent:** Exibe métricas individuais (seus chamados em aberto, chamados aguardando resposta, SLA próximo do vencimento e resolvidos no mês).
  * **Visão do Admin:** Exibe visão macro do sistema (volume total por departamento, chamados não atribuídos em fila de triagem, taxa de estouro de SLA e gráfico de distribuição por status).

---

## 🔒 3. Requisitos Não Funcionais (RNF)

* **RNF-01: Arquitetura e Separação de Conceitos**
  * O sistema deve adotar os princípios de *Clean Architecture* e *Domain-Driven Design (DDD)*. Toda a regra de negócio deve residir em módulos TypeScript puros (`core/domain`), completamente independentes de frameworks de UI (Next.js) ou persistência (Drizzle/PostgreSQL).

* **RNF-02: Segurança e Autenticação**
  * Autenticação baseada em JWT com controle de sessão ativa via `UserSession` no banco de dados.
  * Senhas devem ser armazenadas obrigatoriamente utilizando algoritmo de hashing seguro (ex: `bcrypt` ou `argon2`).
  * Autorização por papéis (*Role-Based Access Control - RBAC*), garantindo sanitização de dados no lado do servidor (Server Actions / API Routes).

* **RNF-03: Integridade de Dados**
  * **Proibição de Exclusão Física:** É estritamente proibido deletar fisicamente (`DELETE FROM`) registros das tabelas `tickets`, `ticket_comments`, `services`, `departments` e `users`. Toda desativação deve utilizar o padrão de Soft Delete (`active: false`).

* **RNF-04: Desempenho e Indexação**
  * As consultas do banco de dados em coleções frequentes (filtros por status, cliente e agente) não devem ultrapassar tempo de resposta de 100ms. Para isso, o schema de banco deve conter índices (`index`) estratégicos nas chaves estrangeiras e campos de filtro.

* **RNF-05: Usabilidade e Responsividade**
  * A interface de usuário (UI) desenvolvida no Next.js deve ser completamente responsiva e adaptável a dispositivos móveis e desktops.

---

## 🔄 4. Matriz de Rastreabilidade: Papéis vs. Módulos

| Papel de Usuário (`userRoleEnum`) | Abertura / Acompanhamento | Atendimento de Chamados | Gestão do Catálogo (Soft Delete) | Dashboard Operacional |
| :--- | :---: | :---: | :---: | :---: |
| **`CLIENT`** | **Permitido** (próprios) | *Negado* | *Negado* | *Negado* |
| **`AGENT`** | *Negado* | **Permitido** (atribuídos) | *Negado* | **Permitido** (visão individual) |
| **`ADMIN`** | *Negado* | **Permitido** (geral/triagem) | **Permitido** (total) | **Permitido** (visão global) |