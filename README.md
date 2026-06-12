# 🎫 Ticketorr - Web Help Desk Management

<p align="center">
  <img src="https://img.shields.io/badge/Status-Em%20Desenvolvimento-blue?style=for-the-badge" alt="Status">
  <img src="https://img.shields.io/badge/Nível-Intermediário-brightgreen?style=for-the-badge" alt="Nível">
  <img src="https://img.shields.io/badge/Duração-4--6%20Semanas-orange?style=for-the-badge" alt="Duração">
</p>

## 📝 Documento de Concepção

* **Nome do Sistema:** Ticketorr
* **Problema:** O caos gerado pela comunicação descentralizada, falta de organização e ausência de rastreabilidade histórica no suporte técnico de TI.
* **Público-Alvo:** Pequenas e médias empresas que necessitam estruturar e profissionalizar o atendimento ao cliente ou suporte de TI interno.
* **Funcionalidades:**
    * **Gerenciamento Dinâmico de Status:** Acompanhamento do ciclo de vida do chamado (Aberto, Em Atendimento, Pendente, Resolvido) garantindo transparência operacional.
    * **Matriz de Priorização:** Classificação de criticidade do incidente (Baixa, Média, Alta, Crítica) para organizar e otimizar a fila de trabalho.
    * **Timeline de Comentários e Histórico:** Canal cronológico de comunicação entre o analista e o cliente com suporte a anexos e notas internas exclusivas para a equipe técnica.
    * **Automação de Workflows:** Motor de regras e transições inteligentes de estados do ticket baseado em eventos e interações na linha do tempo.
* **Diferenciais:** Interface minimalista, intuitiva e sem burocracias. Foco absoluto na agilidade dos quatro módulos fundamentais através do conceito *"ligar e usar"*, permitindo gerenciar o fluxo inteiro em uma única tela fluida.
* **Mercado:** TI Interna / Suporte Técnico (SaaS monetizado por número de agentes de atendimento).

---

## 🧱 Módulos Principais do Sistema (Core)

O ecossistema do Ticketorr baseia-se em quatro pilares de domínio integrados:

1. **Módulo de Status:** Responsável por gerenciar os estados temporais de um chamado, refletindo sua fase exata no fluxo de atendimento para auditoria e controle.
2. **Módulo de Prioridade:** Controla o nível de urgência e o impacto de cada incidente no ambiente da empresa, permitindo realizar uma triagem eficiente de riscos.
3. **Módulo de Comentários (Timeline):** Centraliza de forma cronológica e imutável todas as mensagens e notas internas, armazenando logs textuais e uploads de evidências.
4. **Módulo de Workflow:** Motor de regras de negócio que dita como um chamado transiciona de forma segura entre os estados permitidos conforme a interação do usuário.

---

## 🛠️ Tecnologias e Ferramentas

* **Frontend & BFF:** **Next.js (App Router)**, **TypeScript** e **Tailwind CSS** — Renderização via *Server Components* na listagem de dados e *Client Components* isolados para o controle de estados da tela (App Shell).
* **Banco de Dados & ORM:** **SQLite** acoplado ao **Drizzle ORM** — Infraestrutura local, ágil, leve e tipada de ponta a ponta para persistência de dados relacional.

---

## 🏗️ Arquitetura e Engenharia de Software

O sistema adota uma abordagem fortemente desacoplada baseada no isolamento de responsabilidades. A camada de aplicação do Next.js gerencia as rotas e renderiza os componentes visuais puros, delegando a execução de regras de negócio rígidas e a persistência de dados para a estrutura modular de domínio (`modules/`).

---

## 👥 Casos de Uso (Use Cases)

Fluxos operacionais focados nas personas internas que gerenciam ativamente o ciclo de suporte técnico:

### 🟩 Atores:
* **Cliente (User):** Usuário final da plataforma que necessita de auxílio técnico.
* **Técnico (Agent):** Profissional de TI responsável pela triagem, atendimento e resolução das demandas.
* **Administrador (Admin):** Gestor do sistema responsável por configurações de regras corporativas e métricas.

### 📋 Mapeamento de Casos de Uso:

| ID | Caso de Uso | Ator Principal | Descrição |
| :--- | :--- | :--- | :--- |
| **UC01** | Criar Chamado | Cliente | O cliente preenche o formulário informando o assunto, a descrição e o impacto. O sistema valida os dados e gera um número de protocolo único com status inicial `Aberto`. |
| **UC02** | Filtrar Fila de Atendimento | Técnico / Admin | O agente utiliza o painel operacional para aplicar filtros combinados de status e criticidade, organizando a ordem visual de atuação. |
| **UC03** | Assumir Chamado | Técnico | Na listagem de tickets abertos, o técnico seleciona um chamado livre e associa seu identificador a ele, movendo o status automaticamente para `Em Atendimento`. |
| **UC04** | Registrar Interação (Comentário) | Técnico / Cliente | Adiciona uma nova mensagem à linha do tempo do ticket. Caso o técnico configure como "Nota Interna", a mensagem fica invisível ao cliente. |
| **UC05** | Transição Automática de Estado | Sistema (Workflow) | Quando o técnico insere um comentário público solicitando informações, o motor de regras altera o status do chamado para `Aguardando retorno do usuário` de forma autônoma. |
| **UC06** | Encerrar Chamado | Técnico | Após mitigar o incidente, o técnico documenta a solução e encerra o ticket, alterando seu estado para `Resolvido`. |

---

## 🗄️ Modelagem de Entidades e Relacionamentos

Estrutura de dados normalizada e tipada para garantir a rastreabilidade e a consistência das chaves estrangeiras.

### 📐 Contratos de Tipagem TypeScript

```typescript
export interface User {
  id: string;                      // UUID gerado pelo sistema
  nome: string;
  email: string;
  perfil: "CLIENTE" | "TECNICO" | "ADMIN";
  dataCriacao: Date;
}

export interface Status {
  id: number;                      // 1: Aberto, 2: Em Atendimento, 3: Pendente, 4: Resolvido
  nome: string;
  corHex: string;
}

export interface Prioridade {
  id: number;                      // 1: Baixa, 2: Média, 3: Alta, 4: Crítica
  nome: string;
  corHex: string;
  tempoLimiteHoras: number;
}

export interface Comentario {
  id: string;
  ticketId: string;
  autorId: string;
  conteudo: string;
  isInterno: boolean;              // Restringe a visualização à equipe de TI
  anexoUrl: string | null;         // Caminho físico do arquivo de log ou imagem
  dataCriacao: Date;
}

export interface Ticket {
  id: string;
  protocolo: string;               // Padrão único de identificação estruturada
  titulo: string;
  descricao: string;
  clienteId: string;
  tecnicoId: string | null;        // Nulo até que um analista realize a captura (UC03)
  statusId: number;
  prioridadeId: number;
  dataCriacao: Date;
  dataAtualizacao: Date;

  // Propriedades Opcionais Populadas via Relacionamentos (Drizzle Joins)
  cliente?: User;
  tecnico?: User | null;
  status?: Status;
  prioridade?: Prioridade;
}

export interface TicketHistorico {
  id: string;              // UUID próprio do log
  ticketId: string;        // ID do chamado que sofreu a alteração
  autorId: string;         // ID do usuário (ou sistema) que realizou a ação
  acao: string;            // Tipo da ação: "ALTEROU_STATUS", "ALTEROU_PRIORIDADE", "ASSUMIU_CHAMADO"
  valorAntigo: string;     // Como estava antes (Ex: "Aberto" ou ID "1")
  valorNovo: string;       // Como ficou depois (Ex: "Em Atendimento" ou ID "2")
  dataCriacao: Date;       // Timestamp exato do evento
}

export interface Prioridade {
  id: number;
  nome: NomePrioridade;
  corHex: string;
  tempoLimiteHoras: number; // Controle de SLA
}```

#Estrutura de arquivos do projeto

src/
├── app/                    # Rotas do Next.js (Páginas públicas, privadas e endpoints locais)
│   ├── page.tsx            # Dashboard Executivo / Home Geral
│   ├── layout.tsx          # Layout Raiz (Casca HTML + injeção global do AppShell client)
│   └── chamados/           # Mapeamento da rota e sub-telas da Fila de Atendimento
│       └── page.tsx        
├── components/             # Peças visuais puras (Recebem dados exclusivamente por Props)
│   ├── layout/             # Componentes de infraestrutura visual (AppShell, Header, Sidebar, Footer)
│   └── ui/                 # Elementos genéricos reutilizáveis (Badges, MetricCard, Inputs, Tabelas)
├── hooks/                  # Gerenciadores e hooks customizados de estado do cliente
├── actions/                # Server Actions que realizam a ponte de requisições (fetch → API)
│
├── modules/tickets/        # Domínio de Negócio Isolado: Chamados
│   ├── dto/                # Data Transfer Objects (Contratos de entrada/saída usando Omit/Pick)
│   ├── handlers/           # Manipuladores e interceptores de entrada das requisições
│   ├── usecases/           # Regras e implementações puras dos Casos de Uso (UC01 a UC06)
│   └── repositories/       # Abstração de contratos e interfaces de acesso a dados
│
├── infrastructure/         # Camada tecnológica e de persistência de dados
│   ├── db/                 # Conexão e inicialização com o arquivo SQLite
│   └── schema/             # Arquivos de mapeamento de tabelas e esquemas relacionais do Drizzle ORM
│
└── shared/                 # Recursos utilitários, formatos, tipagens base e constantes globais
