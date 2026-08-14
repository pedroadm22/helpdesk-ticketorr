# ESPECIFICAÇÃO DE REQUISITOS DE SOFTWARE (ERS)
**Projeto:** Sistema de Atendimento e Helpdesk (Catalog & Tickets)  
**Data:** 05/08/2026  
**Versão:** 1.0  

---

## 1. VISÃO GERAL DO SISTEMA

O **Sistema de Helpdesk** tem como objetivo centralizar, organizar e automatizar a gestão de chamados operacionais e técnicos dentro de uma organização. O sistema é composto por dois pilares principais:

1. **Catálogo de Serviços (Catalog):** Estrutura organizacional responsável pelo cadastro e manutenção de Departamentos, Usuários e Serviços oferecidos.
2. **Gestão de Chamados (Tickets):** Módulo operacional que gerencia o ciclo de vida completo do atendimento, cálculo de SLA e comunicação entre solicitantes e agentes.

---

## 2. REQUISITOS FUNCIONAIS (RF)

### RF-01: Gestão de Catálogo

* **RF-01.1 - Cadastro de Usuários:** O sistema deve permitir a gestão de usuários, classificando-os em três papéis (*Roles*):
  * `CLIENT`: Usuário solicitante de chamados.
  * `AGENT`: Técnico/Atendente responsável pela resolução de chamados.
  * `ADMIN`: Administrador geral com acesso irrestrito ao sistema.
* **RF-01.2 - Gestão de Departamentos:** O sistema deve permitir criar, editar e desativar Departamentos organizacionais (ex: TI, RH, Infraestrutura).
* **RF-01.3 - Gestão de Serviços:** O sistema deve permitir o cadastro de serviços vinculados a um departamento, especificando:
  * Nome e Descrição do serviço.
  * Tempo padrão de SLA em horas (`slaHours`).
  * Prioridade padrão (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
  * Status ativo/inativo (`isActive`).
* **RF-01.4 - Vínculo do Agente:** O sistema deve permitir associar um Agente a um ou mais departamentos.

---

### RF-02: Gestão de Chamados (Tickets)

* **RF-02.1 - Abertura de Chamado:** O Cliente deve conseguir abrir um chamado informando Título, Descrição, Departamento e o Serviço desejado.
* **RF-02.2 - Cálculo Automático de SLA:** No momento da criação do chamado, o sistema deve calcular a data/hora limite para solução (`dueDate`) somando o `slaHours` do serviço à data/hora atual.
* **RF-02.3 - Atribuição de Chamado:** O sistema deve permitir que um Agente assuma um chamado ou que um Admin/Agente atribua o chamado a outro técnico do mesmo departamento.
* **RF-02.4 - Controle de Ciclo de Vida (Status):** O chamado deve transitar obrigatoriamente pelos seguintes estados:
  * `OPEN` $\rightarrow$ `IN_PROGRESS` $\rightarrow$ `WAITING_CLIENT` $\rightarrow$ `RESOLVED` $\rightarrow$ `CLOSED` (ou `CANCELED`).
* **RF-02.5 - Histórico de Interações:** Solicitantes e Agentes devem conseguir trocar mensagens dentro do chamado.
* **RF-02.6 - Notas Internas Técnicas:** O sistema deve permitir que Agentes adicionem comentários marcados como privados (`isInternal: true`), visíveis exclusivamente para a equipe de atendimento.

---

### RF-03: Consultas e Filtros

* **RF-03.1 - Visão do Cliente:** O cliente deve visualizar apenas a lista dos seus próprios chamados criados.
* **RF-03.2 - Fila Restrita do Agente:** O agente deve visualizar **exclusivamente os chamados que foram diretamente atribuídos a ele** por um Administrador ou sistema.
* **RF-03.3 - Busca por Código/Palavra-chave:** O sistema deve permitir localizar chamados via código identificador exclusivo (ex: `#INC-1024`) ou palavra-chave no título, respeitando o nível de permissão de cada papel (*Role*).

---

### RF-04: Dashboards e Relatórios

* **RF-04.1 - Dashboard Geral (Admin):** O sistema deve exibir um painel com:
  * Total de chamados agrupados por Status (`OPEN`, `IN_PROGRESS`, `RESOLVED`, `CLOSED`).
  * Indicadores de cumprimento de SLA (taxa de chamados resolvidos no prazo vs. em atraso).
  * Distribuição por Departamento, Serviço e Agente.
* **RF-04.2 - Dashboard do Agente:** O sistema deve exibir para o Agente logado:
  * Resumo dos seus chamados atribuídos por prioridade e status.
  * Alerta de chamados com SLA crítico (próximos de vencer ou vencidos).
* **RF-04.3 - Visão Resumida do Cliente:** Exibição quantitativa rápida dos chamados ativos e do histórico de atendimentos concluídos do próprio solicitante.

---

## 3. REQUISITOS NÃO FUNCIONAIS (RNF)

### RNF-01: Arquitetura e Engenharia de Código

* **RNF-01.1 - Arquitetura Modular Limpa:** O projeto deve ser estruturado em módulos limpos por contexto de negócio (`modules/catalog`, `modules/tickets`).
* **RNF-01.2 - Isolamento de Responsabilidade por Operação:** DTOs, Repositories e UseCases devem ser divididos em arquivos únicos por operação.
* **RNF-01.3 - Abstração via ORM:** Toda persistência e leitura no banco de dados deve utilizar Drizzle ORM atrelada aos repositórios.

---

### RNF-02: Segurança e Controle de Acesso

* **RNF-02.1 - Controle de Acesso Baseado em Papéis (RBAC):**
  * `CLIENT`: Acesso restrito apenas aos dados e chamados associados ao seu ID.
  * `AGENT`: Leitura e escrita restritas aos chamados dos seus departamentos atribuídos.
  * `ADMIN`: Acesso total para criação, edição e exclusão de cadastros no sistema.
* **RNF-02.2 - Sanitização de Entradas:** Todas as entradas via HTTP/DTOs devem ser higienizadas contra vulnerabilidades como SQL Injection e XSS.

---

### RNF-03: Desempenho e Integridade

* **RNF-03.1 - Tempo de Resposta:** As rotas de leitura e listagens paginadas não devem exceder 200ms de tempo de resposta sob carga nominal.
* **RNF-03.2 - Indexação de Banco:** Chaves estrangeiras e atributos de filtro frequente (`status`, `departmentId`, `serviceId`, `code`) devem possuir índices criados no banco.
* **RNF-03.3 - Integridade Referencial e Exclusão Lógica:** Registros do catálogo que possuam vínculos funcionais com chamados ativos não podem ser apagados fisicamente (devem utilizar exclusão lógica `isActive = false`).

---

## 4. MATRIZ DE PERMISSÕES (RBAC)

| Ação no Sistema | CLIENT | AGENT | ADMIN |
| :--- | :---: | :---: | :---: |
| Abrir Chamado | ✅ | ✅ | ✅ |
| Consultar Próprios Chamados | ✅ | ✅ | ✅ |
| Consultar Fila do Departamento | ❌ | ✅ | ✅ |
| Assumir / Atribuir Chamado | ❌ | ✅ | ✅ |
| Alterar Status de Chamado | ❌ | ✅ | ✅ |
| Adicionar Notas Internas | ❌ | ✅ | ✅ |
| Gerenciar Catálogo (Deptos/Serviços/Usuários) | ❌ | ❌ | ✅ |