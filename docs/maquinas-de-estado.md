## 🔄 Máquina de Estados do Chamado (`TicketStatus`)

### 1. Definição dos Estados

* **`OPEN` (Aberto na Fila Geral):** O chamado foi criado pelo cliente e aguarda um administrador atribuí-lo a um técnico/agente.
* **`WAITING_AGENT` (Aguardando Atendimento/Resposta):** O chamado está na fila do agente atribuído. Aguarda ação do técnico (primeira leitura ou resposta a uma dúvida do cliente).
* **`VIEWED` (Em Análise pelo Técnico):** O agente atribuído abriu o chamado e está analisando o problema.
* **`WAITING_CLIENT` (Aguardando Cliente):** O agente respondeu ao cliente com uma dúvida ou instrução e aguarda o retorno do solicitante.
* **`RESOLVED` (Resolvido):** O técnico concluiu o atendimento e marcou o chamado como solucionado. O cliente possui um prazo para validar.
* **`CLOSED` (Encerrado / Finalizado):** O chamado foi concluído definitivamente. Não aceita mais interações diretas.

---

### 2. Mapa Literal do Fluxo de Transições

```text
[Início] 
   │
   ▼
(OPEN) ────[ Admin atribui Agente ]────► (WAITING_AGENT)
   │                                         │
   ├─[ Admin/Cliente Cancela ]               ├─[ Agente abre o chamado ]
   │                          │              │
   ▼                          ▼              ▼
(CLOSED) ◄─────────────── (CLOSED)        (VIEWED)
                              ▲              │
                              │              ├─[ Agente responde cliente ] ──► (WAITING_CLIENT)
                              │              │                                        │
                              │              ├─[ Agente conclui ]                     ├─[ Cliente responde ]
                              │              │  (resolvedAt = now)                    │  (Volta pro agente)
                              │              ▼                                        ▼
                              └──────── (RESOLVED) ◄─────────────────────────── (WAITING_AGENT)
                                             │
                                             ├─[ Cliente reabre ]
                                             │  (resolvedAt = null)
                                             ▼
                                      (WAITING_AGENT)