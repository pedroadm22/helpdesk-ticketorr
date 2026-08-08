# 📑 Especificação de Casos de Uso — Deskflow / ResolvTI

---

## 🟢 UC-01: Abrir Chamado
* **Ator Principal:** Cliente (`CLIENT`)
* **Resumo:** Permite que o cliente abra um novo chamado escolhendo um serviço do catálogo, com resolução automática e bloqueada do departamento responsável.
* **Pré-condições:** O cliente deve estar autenticado.

### Fluxo Principal
1. O cliente acessa a tela de "Novo Chamado".
2. O sistema carrega a lista de **Serviços** ativos.
3. O cliente seleciona o **Serviço** desejado na lista.
4. O sistema busca o departamento atrelado àquele serviço e preenche automaticamente o campo **Departamento** como **somente leitura** (`read-only`).
5. O cliente preenche o **Título** e a **Descrição** do problema.
6. O cliente submete o formulário.
7. O sistema valida que o `serviceId` é válido e ativo.
8. O sistema calcula o prazo de SLA (`slaDueDate`) e grava o chamado com status **`OPEN`**.

### Fluxos Alternativos e Exceções
* **FA1 — Serviço com Categoria Aberta (`isFallback: true`):**
  * No passo 3, se o serviço selecionado tiver a flag `isFallback` ativa (ex: "Outros"), o sistema exibe o campo adicional "Categoria Personalizada".
  * O cliente obrigatoriamente preenche a categoria. O fluxo retorna ao passo 4.
* **FE1 — Departamento ou Serviço Inativo:**
  * Se o serviço for desativado durante a digitação, o sistema bloqueia o envio e solicita que o cliente selecione outro serviço.

---

## 🟢 UC-02: Atribuir Chamado a um Agente
* **Ator Principal:** Administrador (`ADMIN`)
* **Resumo:** Permite ao administrador retirar um chamado da fila geral (`OPEN`) e direcioná-lo para um agente responsável.
* **Pré-condições:** O chamado deve estar no status `OPEN`.

### Fluxo Principal
1. O administrador acessa a lista de chamados não atribuídos.
2. O administrador seleciona um chamado.
3. O sistema exibe a lista de agentes/técnicos pertencentes ao **mesmo departamento** do serviço do chamado.
4. O administrador seleciona o agente responsável e confirma.
5. O sistema valida se o agente pertence ao departamento correto.
6. O sistema atualiza o chamado: `assignedAgentId = agent.id`.
7. O sistema transita o status de **`OPEN`** para **`WAITING_AGENT`**.
8. O sistema registra o histórico de atribuição.

### Fluxos Alternativos e Exceções
* **FE1 — Agente pertence a outro departamento:**
  * O sistema exibe mensagem de erro e impede a atribuição, garantindo que chamados de T.I. só sejam atendidos por agentes de T.I.

---

## 🟢 UC-03: Interagir / Responder ao Chamado
* **Ator Principal:** Cliente (`CLIENT`), Agente (`AGENT`) ou Admin (`ADMIN`)
* **Resumo:** Permite a troca de mensagens em um chamado ativo, além do registro de notas internas por agentes.

### Fluxo Principal
1. O usuário acessa os detalhes do chamado.
2. O usuário digita a resposta no campo de texto.
3. O usuário clica em "Enviar".
4. O sistema grava o comentário em `ticket_comments`.
5. O sistema atualiza os status conforme quem respondeu:
   * Se **Cliente** respondeu estando em `WAITING_CLIENT` $\rightarrow$ status muda para **`WAITING_AGENT`**.
   * Se **Agente** respondeu publicamente estando em `VIEWED` $\rightarrow$ status muda para **`WAITING_CLIENT`**.

### Fluxos Alternativos e Exceções
* **FA1 — Agente insere Nota Interna (`isInternal = true`):**
  * O agente marca a opção "Nota Interna".
  * O sistema salva o comentário com `isInternal: true`.
  * O status do chamado **não** sofre alteração e a mensagem fica visível apenas para agentes/admins.
* **FE1 — Cliente tentar enviar Nota Interna:**
  * O sistema ignora a flag no servidor e salva obrigatoriamente como comentário público.

---

## 🟢 UC-04: Marcar Chamado como Resolvido
* **Ator Principal:** Agente (`AGENT`) ou Admin (`ADMIN`)
* **Resumo:** O técnico conclui o atendimento e envia a solução para o cliente.

### Fluxo Principal
1. O agente acessa o chamado atribuído a ele.
2. O agente clica em "Resolver Chamado".
3. O agente insere um comentário final detalhando a solução aplicada.
4. O sistema registra a data/hora de resolução em `resolvedAt`.
5. O sistema altera o status para **`RESOLVED`**.
6. O sistema notifica o cliente sobre a resolução.

### Fluxos Alternativos e Exceções
* **FA1 — Cliente reabre o chamado:**
  * O cliente acessa o chamado em `RESOLVED` e clica em "Reabrir".
  * O sistema limpa o campo `resolvedAt = null`.
  * O status transita para **`WAITING_AGENT`**, voltando para a fila do técnico.

---

## 🟢 UC-05: Gerenciar Catálogo com Soft Delete
* **Ator Principal:** Administrador (`ADMIN`)
* **Resumo:** O administrador cria, edita e desativa Usuários, Departamentos e Serviços sem apagar registros fisicamente.

### Fluxo Principal
1. O admin acessa a área de Gestão do Catálogo.
2. O admin seleciona o recurso (Usuários, Departamentos ou Serviços).
3. O admin executa a ação desejada (Criar, Editar ou Desativar).
4. Ao clicar em "Desativar/Excluir", o sistema altera o campo `active` para `false`.
5. O recurso é ocultado das opções de escolha para novos chamados, mantendo o histórico de relatórios intacto.

