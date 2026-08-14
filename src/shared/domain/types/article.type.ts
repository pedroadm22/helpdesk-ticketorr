export type Article = Readonly<{
  id: string;
  slug: string;        // Ex: "como-configurar-email-no-outlook" (URL amigável)
  title: string;       // Ex: "Como configurar e-mail no Outlook"
  content: string;     // O texto/tutorial em Markdown ou HTML
  categoryId: string;  // Ex: ID da categoria "E-mail & Redes"
  authorId: string;    // ID do usuário/agente que escreveu o guia
  published: boolean;  // Se está visível para os clientes ou em rascunho
  viewsCount: number;  // Contador de acessos para saber os artigos mais úteis
  createdAt: Date;
  updatedAt: Date;
}>;