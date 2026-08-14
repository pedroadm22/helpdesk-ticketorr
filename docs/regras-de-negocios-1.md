## 02. Regras de Negócio e Invariantes do Domínio

### 👤 Perfis de Acesso (`userRoleEnum`)
- **`CLIENT`**: Solicitante que abre e acompanha seus próprios chamados.
- **`AGENT`**: Técnico vinculado a um departamento específico encarregado de resolver os chamados atribuídos a ele.
- **`ADMIN`**: Gestor geral do sistema com acesso total a métricas, configurações de setores e triagem.

### 📜 As 8 Regras Invariantes Absolutas
1. **Validação de Serviço e Departamento:** Chamados só podem ser abertos para `Service` e `Department` com flag `active: true`.
2. **Serviço Fallback ("Outros"):** Se o cliente selecionar um serviço genérico (`isFallback == true`), o preenchimento do campo `customCategory` torna-se obrigatório.
3. **Imutabilidade do SLA:** O tempo limite de atendimento (`slaDueDate`) é calculado estritamente na criação ($\text{createdAt} + \text{service.slaHours}$) e nunca pode ser editado manualmente.
4. **Atribuição Válida:** Um chamado só pode ser atribuído a um `AGENT` ou `ADMIN` pertencente ao mesmo departamento do serviço associado ao chamado.
5. **Isolamento de Visibilidade do Agente (RF-03.2):** Um `AGENT` só tem permissão para visualizar e interagir com chamados atribuídos explicitamente ao seu ID (`assignedAgentId == agent.id`).
6. **Privacidade de Notas Internas:** Comentários com a flag `isInternal = true` são restritos a `AGENT` e `ADMIN`. Nunca devem ser expostos na interface ou API do `CLIENT`.
7. **Preservação do Histórico:** Departamentos e serviços desativados usam exclusão lógica (`active = false`). A exclusão física de chamados e histórico de interações é estritamente proibida.
8. **Sessões Únicas e Segurança de Autenticação:** A entidade `UserSession` armazena o hash do *refresh token*, IP, *User Agent* e controle de revogação explícita para gerenciamento de dispositivos conectados.